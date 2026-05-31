import { app } from "./app.js";
import { config } from "./utils/config.js";
import { configureDb } from "./utils/db.js";
import { auditEmitter } from "./utils/loggers/message.js";

const PORT = config.PORT || 8080;

const startServer = async () => {
  await configureDb();
  app.listen(PORT);
  console.log(`Server started `);

  auditEmitter.emit("log", {
    type: "INFO",
    message: `Connected on ${PORT}`,
  });
};

startServer();
