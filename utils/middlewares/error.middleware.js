import { errorAuditEmitter } from "../loggers/error.js";
import { config } from "../config.js";
export const errorMiddleware = (err, req, res, next) => {
  let message = err.message;
  let stack = config.NODE_ENV == "development" ? err.stack : "An error occured";
  let path = req.originalPath;
  let method = req.method;
  let statusCode = err.status || 500;

  errorAuditEmitter.emit("error", {
    type: "ERROR",
    message,
    stack,
    method,
    path,
  });
  res.status(statusCode).json({
    success: false,
    message,
    path,
    method,
    stack,
  });

  next();
};
