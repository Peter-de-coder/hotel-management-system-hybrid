import fs from "fs";
import path from "path";
import EventEmitter from "events";
import { fileURLToPath } from "url";

class AuditEmitter extends EventEmitter {}
export const auditEmitter = new AuditEmitter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create logs directory
const auditDir = path.join(__dirname, "../../logs");
const auditFile = path.join(auditDir, "message.log");

// ensure directory exists
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

auditEmitter.on("log", (entry) => {
  const logEntry = {
    timeStamp: new Date().toISOString().replace("T", " "),
    ...entry,
  };

  const logLine = JSON.stringify(logEntry) + "\n";

  try {
    fs.appendFileSync(auditFile, logLine, "utf-8");
    console.log(`Audit logged: ${logEntry.type} - ${logEntry.timeStamp}`);
  } catch (error) {
    console.error("Failed to write log", error);
  }
});
