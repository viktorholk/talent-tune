import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/auth";

import { IUser } from "../models/types";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendResponse(401, "Access Denied", false);
  }

  const verified = verifyToken(token);

  if (!verified) {
    return res.sendResponse(401, "Invalid Token", false);
  }

  // Apply the user to the request so it can be used in the controllers
  req.user = verified as IUser;

  next();
};
