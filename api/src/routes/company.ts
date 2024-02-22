import { Router, Request, Response } from "express";

import { get, getAll } from "@/controllers/company";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.get("/", AuthMiddleware, getAll);
router.get("/:id", AuthMiddleware, get);

export default router;
