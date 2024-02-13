import { IUser } from "../../models/types";

// Extend Express Request interface with user property
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
    export interface Response {
      sendResponse: (statusCode: number, data?: any, logData?: boolean) => Response;
    }
  }
}
