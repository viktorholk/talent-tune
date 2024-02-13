import { Request, Response } from "express";

import { signToken } from "@/utils/auth";
import ProfileModel from "@/models/profile";
import CompanyModel from "@/models/company";

import { createUser } from "@/helpers/user-handler";

export async function createProfile(req: Request, res: Response) {
  const params = req.body;

  if (!params.name || !params.email || !params.password)
    return res.sendResponse(400, "Missing required parameters");

  try {
    const user = await createUser(params.name, params.email, params.password);

    // Create the profile
    //
    // The profile is created after the user is created because the profile
    // depends on the user's id
    const newProfile = new ProfileModel({
      bio: params.bio,
    });
    await newProfile.save();

    // Associate the profile with the user
    user.profileId = newProfile._id;
    await user.save();

    // Create the token so the user don't have to login after registering
    const token = signToken({ _id: user.toObject()._id, ...user.toObject() });

    return res.sendResponse(
      201,
      {
        user: {
          name: params.name,
          email: params.email,
          profile: newProfile.toObject(),
        },
        token,
      },
      false
    );
  } catch (error) {
    return res.sendResponse(400, error);
  }
}

export async function createCompany(req: Request, res: Response) {
  const params = req.body;

  if (
    !params.name ||
    !params.email ||
    !params.password ||
    !params.companyName ||
    !params.companyDescription ||
    !params.companyVat ||
    !params.companyCountry ||
    !params.companyCity ||
    !params.companyAddress ||
    !params.companyZip
  )
    return res.sendResponse(400, "Missing required parameters");

  try {
    const user = await createUser(params.name, params.email, params.password);

    const newCompany = new CompanyModel({
      name: params.companyName,
      description: params.companyDescription,
      vat: params.companyVat,
      country: params.companyCountry,
      city: params.companyCity,
      address: params.companyAddress,
      zip: params.companyZip,
    });

    // Make sure the company doesn't already exist
    const existingCompany = await CompanyModel.findOne({
      vat: newCompany.vat,
    });

    if (existingCompany) return res.sendResponse(403, "Company already exists");

    await newCompany.save();

    // Associate the profile with the user
    user.companyId = newCompany._id;

    await user.save();

    // Create the token so the user don't have to login after registering
    const token = signToken({ _id: user.toObject()._id, ...user.toObject() });

    return res.sendResponse(
      201,
      {
        user: {
          name: params.name,
          email: params.email,
          company: newCompany.toObject(),
        },
        token,
      },
      false
    );
  } catch (error) {
    return res.sendResponse(400, error);
  }
}
