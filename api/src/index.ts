import path from "path";
import dotenv from "dotenv";
// Initialize the environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import cors from "cors";

import LoggerMiddleware from "@/middlewares/logger";
import Logger from "@/utils/logger";
import Routes from "@/routes";

import dbConfig from "@/config/db.config";
import redisConfig from "@/config/redis.config";

async function main() {
  Logger.info("Connecting to MongoDB...");
  await mongoose.connect(dbConfig.url);

  Logger.info("Connecting to Redis...");
  const client = createClient(redisConfig);
  await client.connect();

  const app: Express = express();
  const port = 3001;

  app.use(cors());
  app.use(express.json());

  app.use(LoggerMiddleware);

  app.use("/", Routes);

  app.listen(port, () => {
    Logger.info(`Server running on port ${port}`);
  });
}

Logger.info("Starting server...");
main();
