import { Request, Response } from "express";
import _ from "lodash";
import { signToken } from "@/utils/auth";
import UserModel from "@/models/user";

export async function createToken(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (!params.email || !params.password) return res.sendResponse(400);

  // Make sure the user exists
  const existingUser = await UserModel.findOne({
    email: params.email,
  }).populate([
    {
      path: "profile",
      populate: {
        path: "documents",
        select: "title _id",
      },
    },
    "company",
  ]);

  if (!existingUser) return res.sendResponse(403, "Invalid email or password");
  // Check the password
  const validPassword = await existingUser.checkPassword(params.password);

  if (!validPassword) return res.sendResponse(403, "Invalid email or password");

  const user = existingUser.toObject();

  // Create the token
  const token = signToken({
    _id: user._id,
    email: user.email,
    company: user.company,
    profile: _.omit(user.profile, ["picture"]),
  });

  res.sendResponse(
    200,
    {
      token,
    },
    false
  );
}
