import { Request, Response } from "express";
import { IUser } from "@/models/types";
import ProfileModel from "@/models/profile";
import DocumentModel from "@/models/document";
import CompanyModel from "@/models/company";
import UserModel from "@/models/user";

export async function get(req: Request, res: Response) {
  // Get profile or the company 'profile'
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");

  if (user.isCompany()) {
    const company = await CompanyModel.findById(user.company);

    if (!company) return res.sendResponse(404, "Company not found");

    return res.sendResponse(200, company.toObject());
  } else {
    // ProfileModel.findById(user.profile).populate("documents")
    // arent working :(
    const profile = await ProfileModel.aggregate([
      {
        $lookup: {
          from: "documents",
          localField: "_id",
          foreignField: "profile",
          as: "documents",
        },
      },
      {
        $match: { _id: user.profile },
      },
    ]);

    if (!profile) return res.sendResponse(404, "Profile not found");

    return res.sendResponse(200, profile[0]);
  }
}

export async function update(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");

  if (user.isCompany()) {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      user.company,
      params,
      { new: true }
    );
    return res.sendResponse(200, updatedCompany?.toObject());
  }

  const updatedProfile = await ProfileModel.findByIdAndUpdate(
    user.profile,
    params,
    { new: true }
  );
  return res.sendResponse(200, updatedProfile?.toObject());
}

export async function getId(req: Request, res: Response) {
  const id = req.params.slug;

  const profile = await ProfileModel.findById(id).populate("documents");

  return res.sendResponse(200, { data: profile?.toObject() });
}

export async function getAll(req: Request, res: Response) {
  const profiles = await ProfileModel.find().populate("documents");
  return res.sendResponse(200, {
    result: profiles.map((profile) => profile.toObject()),
  });
}
