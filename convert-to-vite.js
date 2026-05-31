import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

// Helper to recursively list files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(getFiles(filePath));
      }
    } else {
      results.push(filePath);
    }
  });
  return results;
}

// Convert a single file content from TS/TSX to JS/JSX
function convertContent(content, filename) {
  let js = content;

  // 1. Remove Next.js font imports & setup
  js = js.replace(/import\s+\{\s*[^}]*Raleway[^}]*\}\s+from\s+["']next\/font\/google["'];?/g, '');
  js = js.replace(/import\s+\{\s*[^}]*Poppins[^}]*\}\s+from\s+["']next\/font\/google["'];?/g, '');
  js = js.replace(/import\s+\{\s*[^}]*Dancing_Script[^}]*\}\s+from\s+["']next\/font\/google["'];?/g, '');
  js = js.replace(/const\s+raleway\s*=\s*Raleway\([^)]*\);?/g, '');
  js = js.replace(/const\s+poppins\s*=\s*Poppins\([^)]*\);?/g, '');
  js = js.replace(/const\s+dancingScript\s*=\s*Dancing_Script\([^)]*\);?/g, '');

  // 2. Replace Next.js Navigation with React Router
  js = js.replace(/import\s+\{\s*useRouter\s*,\s*useSearchParams\s*,\s*useParams\s*\}\s+from\s+["']next\/navigation["'];?/g, 
                 'import { useNavigate, useSearchParams, useParams } from "react-router-dom";');
  js = js.replace(/import\s+\{\s*useRouter\s*,\s*useSearchParams\s*\}\s+from\s+["']next\/navigation["'];?/g, 
                 'import { useNavigate, useSearchParams } from "react-router-dom";');
  js = js.replace(/import\s+\{\s*useRouter\s*\}\s+from\s+["']next\/navigation["'];?/g, 
                 'import { useNavigate } from "react-router-dom";');
  js = js.replace(/import\s+\{\s*useSearchParams\s*\}\s+from\s+["']next\/navigation["'];?/g, 
                 'import { useSearchParams } from "react-router-dom";');
  js = js.replace(/import\s+\{\s*useParams\s*\}\s+from\s+["']next\/navigation["'];?/g, 
                 'import { useParams } from "react-router-dom";');

  js = js.replace(/const\s+router\s*=\s*useRouter\(\)/g, 'const navigate = useNavigate()');
  js = js.replace(/router\.push\(/g, 'navigate(');

  // 3. Replace Next.js Link & Image
  js = js.replace(/import\s+Link\s+from\s+["']next\/link["'];?/g, 'import { Link } from "react-router-dom";');
  js = js.replace(/import\s+Image\s+from\s+["']next\/image["'];?/g, '');
  // replace <Image ... /> with <img ... />
  js = js.replace(/<Image\s+/g, '<img ');

  // 4. Remove TS type declarations & casts
  // Remove "as string", "as any", "as HTMLInputElement", "as File[]", etc.
  js = js.replace(/\s+as\s+[A-Za-z0-9_\[\]<>]+/g, '');
  // Remove generic type parameters, e.g. useState<IRoom[]> -> useState, createContext<any> -> createContext
  js = js.replace(/useState<[A-Za-z0-9_\[\]<>|]+>/g, 'useState');
  js = js.replace(/useRef<[A-Za-z0-9_\[\]<>|]+>/g, 'useRef');
  js = js.replace(/createContext<[A-Za-z0-9_\[\]<>|]+>/g, 'createContext');
  js = js.replace(/useEffect<[A-Za-z0-9_\[\]<>|]+>/g, 'useEffect');
  
  // Remove type declarations on function parameters, e.g. (e: React.FormEvent) -> (e)
  js = js.replace(/\((\w+)\s*:\s*[A-Za-z0-9_.<>[\]|\s&{}]+([),])/g, '($1$2');
  js = js.replace(/,\s*(\w+)\s*:\s*[A-Za-z0-9_.<>[\]|\s&{}]+/g, ', $1');
  js = js.replace(/:\s*React\.FC(\s*=)/g, '$1');
  js = js.replace(/:\s*React\.ReactNode/g, '');
  
  // Remove interface and type declarations
  js = js.replace(/export\s+interface\s+[A-Za-z0-9_]+\s*\{[\s\S]*?\}/g, '');
  js = js.replace(/interface\s+[A-Za-z0-9_]+\s*\{[\s\S]*?\}/g, '');
  js = js.replace(/export\s+type\s+[A-Za-z0-9_]+\s*=\s*[\s\S]*?;/g, '');
  js = js.replace(/type\s+[A-Za-z0-9_]+\s*=\s*[\s\S]*?;/g, '');

  // Remove "use client";
  js = js.replace(/["']use client["'];?\s*/g, '');

  return js;
}

// Create destination directories if not exist
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const runMigration = () => {
  console.log("Starting Next.js TS to Vite JS conversion...");

  // 1. Find all files under app, components, context, hooks, lib, utils
  const folders = ['components', 'context', 'hooks', 'lib', 'utils'];
  let filesToMigrate = [];
  
  folders.forEach(folder => {
    const dirPath = path.join(rootDir, folder);
    if (fs.existsSync(dirPath)) {
      filesToMigrate = filesToMigrate.concat(getFiles(dirPath));
    }
  });

  // Also include the pages inside app
  const appPath = path.join(rootDir, 'app');
  if (fs.existsSync(appPath)) {
    filesToMigrate = filesToMigrate.concat(getFiles(appPath));
  }

  // 2. Migrate files
  filesToMigrate.forEach(filePath => {
    const relativePath = path.relative(rootDir, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Determine new destination path inside src
    let destPath = relativePath;
    
    // Map app/(site) pages to src/pages
    if (relativePath.startsWith('app')) {
      destPath = relativePath.replace(/^app/, 'src/pages');
      // E.g. app/(site)/about/page.tsx -> src/pages/(site)/about/page.tsx
      // Rename page.tsx/page.ts to index.jsx
      destPath = destPath.replace(/page\.tsx$/, 'index.jsx')
                         .replace(/page\.ts$/, 'index.js')
                         .replace(/\.tsx$/, '.jsx')
                         .replace(/\.ts$/, '.js');
    } else {
      destPath = path.join('src', relativePath)
                     .replace(/\.tsx$/, '.jsx')
                     .replace(/\.ts$/, '.js');
    }

    const fullDestPath = path.join(rootDir, destPath);
    ensureDirectoryExistence(fullDestPath);
    
    const converted = convertContent(content, filePath);
    fs.writeFileSync(fullDestPath, converted, 'utf8');
    console.log(`Converted: ${relativePath} -> ${destPath}`);
  });

  console.log("Next.js TS to Vite JS conversion completed!");
};

runMigration();
