import { Request, Response } from "express";
import _ from "lodash";
import { signToken } from "@/utils/auth";
import UserModel from "@/models/user";

export async function createToken(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (!params.email || !params.password) return res.sendResponse(400);

  // Make sure the user exists
  const existingUser = await UserModel.findOne({ email: params.email });

  if (!existingUser) return res.sendResponse(403, "Invalid email or password");
  // Check the password
  const validPassword = await existingUser.checkPassword(params.password);

  if (!validPassword) return res.sendResponse(403, "Invalid email or password");

  // Create the token
  const token = signToken({
    _id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
    isCompany: existingUser.isCompany(),
  });

  res.sendResponse(
    200,
    {
      token,
    },
    false
  );
}
