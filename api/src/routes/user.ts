import { Router, Request, Response } from "express";

import { create } from "@/controllers/user";

const router = Router();

router.post("/", create);

export default router;
