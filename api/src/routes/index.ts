import { Router } from "express";

import RegisterRouter from "@/routes/register";
import ProfileRouter from "@/routes/profile";
import CompanyRouter from "@/routes/company";
import JobListingRouter from "@/routes/job-listing";
import AuthRouter from "@/routes/auth";
import AssistantRouter from "@/routes/assistant";

const router = Router();

router.use("/register", RegisterRouter);
router.use("/companies", CompanyRouter);
router.use("/profile", ProfileRouter);
router.use("/job-listings", JobListingRouter);
router.use("/auth", AuthRouter);
router.use("/assistant", AssistantRouter);

export default router;
