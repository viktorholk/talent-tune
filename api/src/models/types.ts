import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  name?: string;
  email: string;
  password?: string;
  companyId?: ObjectId;
  profileId?: ObjectId;
}

export interface IProfile {
  _id?: ObjectId;
  bio?: string;
  documents?: IDocument[];
}

export interface IDocument {
  _id?: ObjectId;
  title: string;
  encoded: string;
}

export interface ICompany {
  _id?: ObjectId;
  user_id: ObjectId;
  name: string;
  description?: string;
  vat: string;
  country: string;
  city: string;
  address: string;
  zip: string;
}

export interface IJobListing {
  _id?: ObjectId;
  company_id: ObjectId;
  title: string;
  description: string;
  tags: string[];
}
