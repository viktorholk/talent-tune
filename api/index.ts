import dotenv from "dotenv";
// Initialize the environment variables
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import Routes from "./routes";

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/", Routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
