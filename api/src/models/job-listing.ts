import { Schema, model, Document, ObjectId, Types } from "mongoose";

import { IJobListing } from "./types";

export interface IJobListingDocument extends IJobListing, Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const JobListingSchema: Schema<IJobListingDocument> = new Schema(
  {
    company: {
      type: Types.ObjectId,
      ref: "Company",
    },
    title: String,
    description: String,
    tags: [String],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("JobListing", JobListingSchema);
