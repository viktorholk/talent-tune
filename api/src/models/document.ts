import { Schema, model, Document, ObjectId, Types } from "mongoose";

import { IDocument } from "./types";

export interface IDocumentDocument extends IDocument, Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

const DocumentSchema: Schema<IDocumentDocument> = new Schema(
  {
    title: String,
    encoded: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Document", DocumentSchema);
