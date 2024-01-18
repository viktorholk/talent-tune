import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";

import UserRouter from "./user";
import AuthRouter from "./auth";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
