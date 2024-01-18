import { request, Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.body.password) {
    req.body.password = "********";
  }

  console.log(
    `${new Date().toLocaleString()} ${req.method} ${
      req.path
    } - ${JSON.stringify(req.body)}`
  );
  next();
}
