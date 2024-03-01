import { Router, Request, Response } from "express";

import AuthMiddleware from "@/middlewares/auth";
import { update } from "@/controllers/user";

const router = Router();

router.patch("/", AuthMiddleware, update);

export default router;
