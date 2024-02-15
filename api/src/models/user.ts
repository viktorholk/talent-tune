import { Schema, model, Document, ObjectId, Types } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "./types";

export interface IUserDocument extends IUser, Document {
  _id: ObjectId;
  checkPassword(password: string): Promise<boolean>;
  isCompany(): boolean;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: String,
    email: String,
    password: String,
    company: {
      type: Types.ObjectId,
      ref: "Company",
    },
    profile: {
      type: Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.methods.checkPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.isCompany = function(): boolean {
  return this.company !== undefined;
};

export default model("User", UserSchema);
