import { Request, Response } from "express";

import UserModel from "@/models/user";
import bcrypt from "bcrypt";
import _ from "lodash";

export async function update(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "user does not exist");

  if (params.name) {
    user.name = params.name;
  }

  if (params.password?.length > 0) {
    user.password = await bcrypt.hash(params.password, 10);
  }

  await user.save();

  return res.sendResponse(200, _.omit(user.toObject(), "password"));
}
