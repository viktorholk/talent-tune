
export interface IUserRequest extends Request {
  user: IUser;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
}
