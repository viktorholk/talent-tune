import { Router, Request, Response } from "express";

import { createProfile, createCompany } from "@/controllers/register";

const router = Router();

router.post("/profile", createProfile);
router.post("/company", createCompany);

export default router;
