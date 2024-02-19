import { Router, Request, Response } from "express";

import { handleChat, initializeChat } from "@/controllers/assistant";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/initialize", AuthMiddleware, initializeChat);
router.post("/chat/:id", AuthMiddleware, handleChat);

export default router;
