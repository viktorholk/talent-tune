import { Router, Request, Response } from "express";

import { create, get, getAll, update, remove } from "@/controllers/job-listing";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, create);
router.get("/", AuthMiddleware, getAll);
router.get("/:id", AuthMiddleware, get);
router.patch("/", AuthMiddleware, update);
router.delete("/", AuthMiddleware, remove);

export default router;
