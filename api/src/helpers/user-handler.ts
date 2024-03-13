import UserModel from "@/models/user";

import bcrypt from "bcrypt";

import { validateEmail } from "@/utils/validator";

import { IUserDocument } from "@/models/user";

export async function createUser(
  email: string,
  password: string
): Promise<IUserDocument> {
  // Validate the right parameters are present
  if (!email || !password) throw "Missing required parameters";

  // validate the email
  if (!validateEmail(email)) throw "Invalid email";

  // Make sure the user doesn't already exist
  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) throw "User already exists";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: hashedPassword,
  };

  // Create the user
  const newUser = new UserModel(user);
  await newUser.save();

  return newUser;
}
