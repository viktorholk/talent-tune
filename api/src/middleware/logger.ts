import { request, Request, Response, NextFunction } from "express";
import _ from "lodash";

export default function(req: Request, res: Response, next: NextFunction) {
  // Make a copy of the request body
  // so that we can mask the password
  let body = { ...req.body };

  if (body.password) {
    body.password = "********";
  }

  console.log(`${new Date().toLocaleString()} ${req.method} ${req.path}`);
  // Only output the body if it's not empty
  if (!_.isEmpty(body)) console.log(JSON.stringify(body));
  next();
}
