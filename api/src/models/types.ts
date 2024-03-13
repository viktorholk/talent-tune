import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  email: string;
  password?: string;
  company?: ICompany;
  profile?: IProfile;
}

export interface IProfile {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  bio?: string;
  picture?: string;
  tags: string[];
  documents?: IDocument[];
}

export interface IDocument {
  _id?: ObjectId;
  profile: IProfile;
  title: string;
  encoded: string;
}

export interface ICompany {
  _id?: ObjectId;
  user: ObjectId;
  name: string;
  description?: string;
  vat: string;
  country: string;
  city: string;
  address: string;
  zip: string;
  jobListings?: [IJobListing];
}

export interface IJobListing {
  _id?: ObjectId;
  company: ObjectId;
  title: string;
  description: string;
  tags: string[];
}
