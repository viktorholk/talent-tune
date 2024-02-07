import { Router } from "express";

import UserRouter from "@/routes/user";
import CompanyRouter from "@/routes/company";
import AuthRouter from "@/routes/auth";
import AssistantRouter from "@/routes/assistant";

const router = Router();

router.use("/users", UserRouter);
router.use("/companies", CompanyRouter);
router.use("/auth", AuthRouter);
router.use("/assistant", AssistantRouter);

export default router;
