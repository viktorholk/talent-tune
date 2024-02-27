import { Request, Response } from "express";

import DocumentModel from "@/models/document";
import ProfileModel from "@/models/profile";
import UserModel from "@/models/user";

export async function create(req: Request, res: Response) {
  const params = req.body;
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");

  const profile = await ProfileModel.findById(user.profile);

  if (!profile) return res.sendResponse(403, "Profile not found");

  if (!params.title || !params.encoded)
    return res.sendResponse(400, "Missing required parameters");

  const document = new DocumentModel({
    profile: profile,
    title: params.title,
    encoded: params.encoded,
  });
  await document.save();

  return res.sendResponse(201);
}

export async function remove(req: Request, res: Response) {
  const id = req.params.slug;
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");
  const profile = await ProfileModel.findById(user.profile);
  if (!profile) return res.sendResponse(403, "Profile not found");

  const document = await DocumentModel.findById(id);
  if (!document) return res.sendResponse(403, "Document not found");

  await DocumentModel.findByIdAndDelete(document._id);

  return res.sendResponse(200);
}
