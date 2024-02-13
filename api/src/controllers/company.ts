import { Request, Response } from "express";

import CompanyModel from "@/models/company";

export async function getAll(req: Request, res: Response) {
  const companies = await CompanyModel.find();
  return res.sendResponse(200, { data: companies });
}
