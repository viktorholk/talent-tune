import { Request, Response } from "express";
import mongoose from "mongoose";

import CompanyModel from "@/models/company";
import UserModel from "@/models/user";
import JobListingModel from "@/models/job-listing";

export async function create(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "User does not exist");

  // Validate the right parameters are present
  if (!params.title || !params.description) {
    return res.sendResponse(400, "Missing required parameters");
  }

  // valid the company_id and the user with the database
  const company = await CompanyModel.findById(user.company);

  if (!company) return res.sendResponse(403, "Company not found");

  // construct the company object
  let jobListing = {
    company: company,
    title: params.title,
    description: params.description,
    tags: params.tags,
  };

  const newJobListing = await JobListingModel.create(jobListing);
  newJobListing.save();

  return res.sendResponse(201, newJobListing.toObject());
}

export async function getAll(req: Request, res: Response) {
  const jobListings = await JobListingModel.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
  ]);

  return res.sendResponse(200, { data: jobListings });
}
