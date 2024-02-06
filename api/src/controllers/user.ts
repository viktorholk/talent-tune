import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { signToken } from "@/utils/auth";
import UserModel from "@/models/user";

import { validateEmail } from "@/utils/validator";
import { IUser } from "@/models/types";

export async function create(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (
    !params.name ||
    !params.email ||
    !params.password ||
    !params.confirmPassword
  )
    return res.sendResponse(400, "Missing required parameters");

  // validate the email
  if (!validateEmail(params.email))
    return res.sendResponse(400, "Invalid email");

  // Validate the password
  if (params.password !== params.confirmPassword)
    return res.sendResponse(400, "Passwords don't match");

  // construct the user object
  let user: IUser = {
    name: params.name,
    email: params.email,
  };

  // If the company object is present then validate the company object
  if (params.company) {
    if (
      !params.company.name ||
      !params.company.description ||
      !params.company.vat
    )
      return res.sendResponse(400, "Missing required company parameters");

    user.company = {
      name: params.company.name,
      description: params.company.description,
      vat: params.company.vat,
    };
  }

  // Make sure the user doesn't already exist
  const existingUser = await UserModel.findOne({
    email: params.email,
  });

  if (existingUser) return res.sendResponse(403, "User already exists");

  // Make sure the company doesn't already exist
  if (user.company) {
    const existingCompany = await UserModel.findOne({
      "company.vat": user.company.vat,
    });

    if (existingCompany) return res.sendResponse(403, "Company already exists");
  }

  // Hash the password
  user.password = await bcrypt.hash(params.password, 10);

  // Create the user
  const newUser = new UserModel(user);
  await newUser.save();

  // Create the token so the user don't have to login after registering
  const token = signToken({ _id: newUser._id, ...user });

  // Exclude the password from the response
  const { _id, password, created_at, updated_at, __v, ...userOmittedFields } =
    newUser.toObject();

  return res.sendResponse(
    201,
    {
      ...userOmittedFields,
      token,
    },
    false
  );
}
