import { Request, Response } from "express";
import mongoose from "mongoose";

import CompanyModel from "@/models/company";
import JobListingModel from "@/models/job-listing";

export async function create(req: Request, res: Response) {
  const params = req.body;

  // Validate the right parameters are present
  if (!params.company_id || !params.title || !params.description) {
    return res.sendResponse(400, "Missing required parameters");
  }

  // valid the company_id and the user with the database
  const company = await CompanyModel.findById(params.company_id);

  if (!company) return res.sendResponse(403, "Company not found");

  // construct the company object
  let jobListing = {
    company_id: params.company_id,
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
        localField: "company_id",
        foreignField: "_id",
        as: "company",
      },
    },
  ]);

  return res.sendResponse(200, { data: jobListings });
}
