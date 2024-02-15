import { Router, Request, Response } from "express";

import {
  get as getProfile,
  update as updateProfile,
} from "@/controllers/profile";
import {
  create as createDocument,
  remove as removeDocument,
} from "@/controllers/document";

import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.get("/", AuthMiddleware, getProfile);
router.patch("/", AuthMiddleware, updateProfile);

router.post("/documents", AuthMiddleware, createDocument);
router.delete("/documents", AuthMiddleware, removeDocument);

export default router;
