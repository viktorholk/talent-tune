import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";

const router = Router();

router.get("/timestamp", async (req: Request, res: Response) => {
  res.send(`Timestamp: ${new Date()}`);
});

export default router;
