import { app } from "../app.js";
import { configureDb } from "../utils/db.js";
import mongoose from "mongoose";

// Middleware to ensure DB is connected before handling requests in Vercel serverless environment
let dbConnecting = null;

app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    if (!dbConnecting) {
      dbConnecting = configureDb();
    }
    try {
      await dbConnecting;
    } catch (err) {
      dbConnecting = null;
      return next(err);
    }
  }
  next();
});

export default app;
