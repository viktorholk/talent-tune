import { Router, Request, Response } from "express";

import UserController from "../controllers/user";

const router = Router();

router.post("/create", UserController.create);

export default router;
