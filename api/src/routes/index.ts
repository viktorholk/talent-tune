import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";

import UserRouter from "./user";
import AuthRouter from "./auth";

import correlator from "correlation-id";
import Logger from "../utils/logger";

const router = Router();

// Test Routes
router.get("/timestamp", (req: Request, res: Response) => {
  res.sendResponse(200, { timestamp: `${new Date()}` });
});

router.get("/auth-timestamp", AuthMiddleware, (req: Request, res: Response) => {
  res.sendResponse(200, { timestamp: `${new Date()}` });
});

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
