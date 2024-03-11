import { Schema, model, Document, ObjectId, Types } from "mongoose";

import { IProfile, IDocument } from "./types";

export interface IProfileDocument extends IProfile, Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const ProfileSchema: Schema<IProfileDocument> = new Schema(
  {
    firstName: String,
    lastName: String,
    tags: [String],
    bio: String,
    picture: String,
    documents: [
      {
        type: Types.ObjectId,
        ref: "Document",
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
