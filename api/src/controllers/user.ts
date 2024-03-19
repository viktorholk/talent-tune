import { Request, Response } from "express";

import UserModel from "@/models/user";
import ProfileModel from "@/models/profile";
import DocumentModel from "@/models/document";
import CompanyModel from "@/models/company";
import JobListingModel from "@/models/job-listing";

import bcrypt from "bcrypt";
import _ from "lodash";

export async function update(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "user does not exist");

  if (params.password?.length > 0) {
    user.password = await bcrypt.hash(params.password, 10);
  }

  await user.save();

  return res.sendResponse(200, _.omit(user.toObject(), "password"));
}

export async function del(req: Request, res: Response) {
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "user does not exist");

  // delete associated profile / company data
  if (user.isCompany()) {
    await CompanyModel.findByIdAndDelete(user.company?._id);
    await JobListingModel.deleteMany({ company: user.company?._id });
  } else {
    await ProfileModel.findByIdAndDelete(user.profile?._id);
    await DocumentModel.deleteMany({ profile: user.profile?._id });
  }
  await UserModel.findByIdAndDelete(user._id);

  return res.sendResponse(200, "User removed");
}
