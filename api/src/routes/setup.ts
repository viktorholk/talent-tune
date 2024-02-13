import { Router, Request, Response } from "express";

import { createProfile, createCompany } from "@/controllers/setup";

const router = Router();

router.post("/create-profile", createProfile);
router.post("/create-company", createCompany);

export default router;
