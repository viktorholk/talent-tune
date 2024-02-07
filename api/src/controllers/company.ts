import { Request, Response } from "express";

import CompanyModel from "@/models/company";

export async function create(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (
    !params.name ||
    !params.vat ||
    !params.country ||
    !params.address ||
    !params.zip
  ) {
    return res.sendResponse(400, "Missing required parameters");
  }

  // construct the company object
  let company = {
    user_id: req.user._id,
    name: params.name,
    description: params.description,
    vat: params.vat,
    country: params.country,
    address: params.address,
    zip: params.zip,
  };

  // Make sure the company doesn't already exist
  const existingCompany = await CompanyModel.findOne({
    vat: company.vat,
  });

  if (existingCompany) return res.sendResponse(403, "Company already exists");

  // Create the company
  const newCompany = await CompanyModel.create(company);
  newCompany.save();

  return res.sendResponse(201, newCompany.toObject());
}

export async function getAll(req: Request, res: Response) {
  const companies = await CompanyModel.aggregate([
    {
      $lookup: {
        from: "joblistings",
        localField: "_id",
        foreignField: "company_id",
        as: "jobListings",
      },
    },
  ]);
  return res.sendResponse(200, { data: companies });
}
