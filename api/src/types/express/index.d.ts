import { IUser } from "../../models/types";

// Extend Express Request interface with user property
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
