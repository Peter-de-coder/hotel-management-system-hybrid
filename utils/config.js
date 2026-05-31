import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading from the root of the HOTEL folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Fallback to current working directory
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  BREVO_SMTP_USER: process.env.BREVO_SMTP_USER,
  BREVO_SMTP_KEY: process.env.BREVO_SMTP_KEY,
  BREVO_SENDER: process.env.BREVO_SENDER,
};
