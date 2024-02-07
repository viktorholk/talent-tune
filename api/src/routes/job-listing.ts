import { Router, Request, Response } from "express";

import { create, getAll } from "@/controllers/job-listing";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, create);
router.get("/", AuthMiddleware, getAll);

export default router;
