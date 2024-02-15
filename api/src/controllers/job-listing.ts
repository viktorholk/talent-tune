import { Request, Response } from "express";

import _ from "lodash";
import CompanyModel from "@/models/company";
import UserModel from "@/models/user";
import JobListingModel from "@/models/job-listing";

export async function create(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "user does not exist");

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

export async function update(req: Request, res: Response) {
  const params = req.body;

  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(400, "user does not exist");

  // valid the company_id and the user with the database
  const company = await CompanyModel.findById(user.company);

  if (!company) return res.sendResponse(403, "Company not found");

  // Check that the user has right to update the job listing
  const jobListing = await JobListingModel.findById(params._id);

  if (jobListing?.company.toString() !== company._id.toString()) {
    return res.sendResponse(
      403,
      "You do not have permission to update this job listing"
    );
  }

  const updatedJobListing = await JobListingModel.findByIdAndUpdate(
    params._id,
    _.omit(params, ["_id"]),
    { new: true }
  );

  return res.sendResponse(200, updatedJobListing?.toObject());
}

export async function remove(req: Request, res: Response) {
  const params = req.body;

  await JobListingModel.findByIdAndDelete(params._id);

  return res.sendResponse(200, "Job Listing removed");
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
