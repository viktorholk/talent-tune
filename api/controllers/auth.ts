import { Request, Response } from "express";
import { signToken } from "../utils/auth";
import UserModel from "../models/user";

async function createToken(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (!params.email || !params.password) return res.sendStatus(400);

  // Make sure the user exists
  const existingUser = await UserModel.findOne({ email: params.email });

  if (!existingUser) return res.status(403).send("Invalid email or password");

  // Check the password
  const validPassword = await existingUser.checkPassword(params.password);

  if (!validPassword) return res.status(403).send("Invalid email or password");

  // Create the token
  const token = signToken({
    id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
  });

  // Send the token
  res.send({
    token: token,
  });
}

export default { createToken };
