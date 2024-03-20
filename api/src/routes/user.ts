import { Router, Request, Response } from "express";

import AuthMiddleware from "@/middlewares/auth";
import { update, del } from "@/controllers/user";

const router = Router();

router.patch("/", AuthMiddleware, update);
router.delete("/", AuthMiddleware, del);

export default router;
