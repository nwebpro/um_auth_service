import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLogger, infoLogger } from "./shared/logger";

// Database Connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info("Database connected");
    app.listen(config.port, () => {
      infoLogger.info(`Server started at http://localhost:${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Database connection failed", error);
  }
}
bootstrap();
