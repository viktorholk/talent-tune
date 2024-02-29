import { Router, Request, Response } from "express";

import {
  create,
  getAll,
  getId,
  update,
  remove,
} from "@/controllers/job-listing";
import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, create);
router.get("/", AuthMiddleware, getAll);
router.get("/:id", AuthMiddleware, getId);
router.patch("/:id", AuthMiddleware, update);
router.delete("/:id", AuthMiddleware, remove);

export default router;
