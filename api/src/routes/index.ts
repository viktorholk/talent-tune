import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";

import UserRouter from "./user";
import AuthRouter from "./auth";

import correlator from "correlation-id";
import Logger from "../utils/logger";
import { getStreamingCompletion } from "../helpers/assistant";

const router = Router();

router.post("/optimize", async (req: Request, res: Response) => {
  const params = req.body;

  if (!params.jobDescription || !params.resume)
    return res.sendResponse(400, "Missing parameters");

  try {
    const stream = await getStreamingCompletion(
      params.jobDescription,
      params.resume,
      params.instructions
    );
    let starttime = Date.now();
    for await (const part of stream) {
      const chunkTime = (Date.now() - starttime) / 1000;

      const chunk = part.choices[0]?.delta.content;

      Logger.info(chunk);

      res.write(chunk || "");
    }

    res.end();
  } catch (error) {
    res.sendResponse(500, error);
  }
});

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
