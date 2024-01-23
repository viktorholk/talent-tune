
import { IUser } from "../../models/types";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

