import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";
import { Server } from "http";

// Uncaught expression error handler
process.on("uncaughtException", (error) => {
  errorLogger.error("Uncaught Exception is detected", error);
  process.exit(1);
});
let server: Server;

// Database Connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info("Database connected");
    server = app.listen(config.port, () => {
      infoLogger.info(`Server started at http://localhost:${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Database connection failed", error);
  }

  //  Fix Error Log , Gracefully off your server
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error("Unhandled Rejection is detected", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

// Gracefully off your server
process.on("SIGTERM", () => {
  infoLogger.info("SIGTERM RECEIVED. Shutting down gracefully");
  if (server) {
    server.close();
  }
});
