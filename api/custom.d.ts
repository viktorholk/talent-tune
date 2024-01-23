import { Request } from 'express';
import { IUser } from './models/types';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
