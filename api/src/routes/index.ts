import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";

import UserRouter from "./user";
import AuthRouter from "./auth";

const router = Router();

// Test Routes
router.get("/timestamp", (req: Request, res: Response) => {
  res.send(`${new Date()}`);
});

router.get("/auth-timestamp", AuthMiddleware, (req: Request, res: Response) => {
  res.send(`${new Date()}`);
});

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
