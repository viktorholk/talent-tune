import { Request, Response } from "express";

import CompanyModel from "@/models/company";

export async function get(req: Request, res: Response) {
  const id = req.params.id;
  const company = await CompanyModel.findById(id).populate("jobListings");

  return res.sendResponse(200, { data: company });
}

export async function getAll(req: Request, res: Response) {
  const companies = await CompanyModel.aggregate([
    {
      $lookup: {
        from: "joblistings",
        localField: "_id",
        foreignField: "company",
        as: "jobListings",
      },
    },
  ]);

  return res.sendResponse(200, { data: companies });
}
