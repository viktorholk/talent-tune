import dotenv from 'dotenv';
// Initialize the environment variables
dotenv.config();

import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Logger from './middleware/logger';
import Routes from './routes';

import UserModel from './models/user';

async function main() {
  const mong = await mongoose.connect(process.env.MONGO_URL as string);

  const app: Express = express();
  const port = 3001;

  app.use(cors());
  app.use(express.json());

  app.use(Logger);

  app.use('/', Routes);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

console.log('Starting server...');
main();
