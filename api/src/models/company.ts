import { Schema, model, Document, ObjectId, Types } from "mongoose";

import { ICompany } from "./types";

export interface ICompanyDocument extends ICompany, Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const CompanySchema: Schema<ICompanyDocument> = new Schema(
  {
    user_id: Types.ObjectId,
    name: String,
    description: String,
    vat: String,
    country: String,
    address: String,
    zip: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Company", CompanySchema);
