import path from "path";
import dotenv from "dotenv";
// Initialize the environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

import RedisStore from "@/utils/redis-store";

import LoggerMiddleware from "@/middlewares/logger";
import Logger from "@/utils/logger";
import Routes from "@/routes";

import dbConfig from "@/config/db.config";
mongoose.set("debug", true);

async function main() {
  Logger.info("Connecting to MongoDB...");

  await mongoose.connect(dbConfig.url);

  // Setup redis
  await RedisStore.setup();

  // Setup server config and start server
  const app: Express = express();
  const port = 3001;
  const host = "0.0.0.0";

  app.use(cors());
  app.use(express.json());

  app.use(LoggerMiddleware);

  app.use("/", Routes);

  app.listen(port, host, () => {
    Logger.info(`Server running on port ${host}:${port}`);
  });
}

Logger.info("Starting server...");
main();
