import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {
  checkPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    name: String,
    email: String,
    password: String,
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

export default model("User", UserSchema);
