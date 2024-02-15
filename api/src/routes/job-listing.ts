import { Router, Request, Response } from "express";

import { create, getAll, update, remove } from "@/controllers/job-listing";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, create);
router.get("/", AuthMiddleware, getAll);
router.patch("/", AuthMiddleware, update);
router.delete("/", AuthMiddleware, remove);

export default router;
