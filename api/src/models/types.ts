export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  companyId?: string;
}

export interface ICompany {
  _id?: string;
  user_id: string;
  name: string;
  description?: string;
  vat: string;
  country: string;
  address: string;
  zip: string;
}
