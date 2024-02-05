import { Router } from "express";

import UserRouter from "@/routes/user";
import AuthRouter from "@/routes/auth";
import AssistantRouter from "@/routes/assistant";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/assistant", AssistantRouter);

export default router;
