import { Router, Request, Response } from "express";

import { create, remove } from "@/controllers/document";

import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, create);
router.delete("/", AuthMiddleware, remove);

export default router;
