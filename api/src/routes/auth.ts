import { Router, Request, Response } from "express";

import { createToken } from "@/controllers/auth";

const router = Router();

router.post("/token", createToken);

export default router;
