export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  companyId?: string;
}

export interface ICompany {
  _id?: string;
  userId: string;
  name: string;
  description?: string;
  vat: string;
  country: string;
  address: string;
  zip: string;
}
