import { Router, Request, Response } from "express";

import exportTextFromPDF from "../helpers/pdf-handler";

const router = Router();

router.post("/PDF", exportTextFromPDF);

export default router;
