import { Schema, model, Document, ObjectId, Types } from "mongoose";

import { IProfile, IDocument } from "./types";

export interface IProfileDocument extends IProfile, Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const ProfileSchema: Schema<IProfileDocument> = new Schema(
  {
    bio: String,
    documents: [
      {
        type: Types.ObjectId,
        ref: "document",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Profile", ProfileSchema);
