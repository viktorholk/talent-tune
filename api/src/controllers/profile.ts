import { Request, Response } from "express";
import { IUser } from "@/models/types";
import ProfileModel from "@/models/profile";
import CompanyModel from "@/models/company";
import UserModel from "@/models/user";

export async function create(req: Request, res: Response) {
  const params = req.body;
  // Validate the right parameters are present
  const user = await UserModel.findById(params.user_id);

  if (!user) return res.sendResponse(403, "User not found");

  if (!params.name) {
    return res.sendResponse(400, "Missing required parameters");
  }
  // construct the profile object
  let profile = {
    user_id: params.user_id,
    bio: params.bio || "",
  };
  const newProfile = await ProfileModel.create(profile);
  newProfile.save();

  // Update the user with the profile_id
  user.profileId = newProfile.toObject()._id;
  await user.save();

  return res.sendResponse(201, newProfile.toObject());
}

export async function get(req: Request, res: Response) {
  // Get profile or the company 'profile'
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");

  if (user.isCompany()) {
    const company = await CompanyModel.findById(user.companyId);

    if (!company) return res.sendResponse(404, "Company not found");

    return res.sendResponse(200, company.toObject());
  } else {
    const profile = await ProfileModel.findById(user.profileId);

    if (!profile) return res.sendResponse(404, "Profile not found");

    return res.sendResponse(200, profile.toObject());
  }
}
