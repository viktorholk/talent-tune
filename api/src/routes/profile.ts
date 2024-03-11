import { Router, Request, Response } from "express";

import {
  get as getProfile,
  update as updateProfile,
  getAll,
  getId,
} from "@/controllers/profile";
import {
  create as createDocument,
  remove as removeDocument,
  getId as getIdDocument,
} from "@/controllers/document";

import AuthMiddleware from "@/middlewares/auth";

const router = Router();

router.get("/", AuthMiddleware, getProfile);
router.get("/find/:slug", AuthMiddleware, getId); // Yeahhhh
router.get("/all", AuthMiddleware, getAll);
router.patch("/", AuthMiddleware, updateProfile);

router.post("/documents", AuthMiddleware, createDocument);
router.get("/documents/:slug", AuthMiddleware, getIdDocument);
router.delete("/documents/:slug", AuthMiddleware, removeDocument);

export default router;
