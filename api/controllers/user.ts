import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { signToken } from "../utils/auth";
import UserModel from "../models/user";

async function create(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (!params.name || !params.email || !params.password)
    return res.sendStatus(400);

  // Make sure the user doesn't already exist
  const existingUser = await UserModel.findOne({ email: params.email });

  if (existingUser) return res.status(403).send("User already exists");

  // Hash the password
  const hashedPassword = await bcrypt.hash(params.password, 10);

  const user = {
    name: params.name,
    email: params.email,
    password: hashedPassword,
  };

  // Create the user
  const newUser = new UserModel(user);
  await newUser.save();

  // Create the token so the user don't have to login after registering
  const token = signToken({ _id: newUser._id, ...user });

  return res.status(201).send(token);
}

export default { create };
