import { Router, Request, Response } from "express";

import { create, get } from "@/controllers/profile";

import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", create);
router.get("/", AuthMiddleware, get);

export default router;
