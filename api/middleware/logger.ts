import { request, Request, Response, NextFunction } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
  // Make a copy of the request body
  // so that we can mask the password
  let body = { ...req.body };

  if (body.password) {
    body.password = "********";
  }

  console.log(
    `${new Date().toLocaleString()} ${req.method} ${req.path}\n${JSON.stringify(body)}`
  );
  next();
}
