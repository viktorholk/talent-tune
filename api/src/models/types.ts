export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  company?: ICompany;
}

export interface ICompany {
  name: string;
  description: string;
  vat: string;
}
