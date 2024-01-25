import { request, Request, Response, NextFunction } from "express";
import correlator from "correlation-id";
import _ from "lodash";
import Logger from "../utils/logger";

const logRequest = (req: Request, next: NextFunction) => {
  // Make a copy of the request body
  // so that we can mask the password
  let body = { ...req.body };

  if (body.password) {
    body.password = "********";
  }

  Logger.info(`${req.method} Request ${req.path}`, body);

  next();
};

export default function(req: Request, res: Response, next: NextFunction) {
  const id = correlator.getId();

  // Setup custom response method
  // This method will be available in all controllers
  // to help log the response

  res.sendResponse = function(
    statusCode: number,
    data: any,
    logData: boolean = true
  ): Response {
    if (typeof data === "string") {
      data = {
        message: data,
      };
    }

    if (logData) Logger.info(`${statusCode} Response`, data);
    else Logger.info(`${statusCode} Response`);

    return this.status(statusCode).json({
      ...data,
    });
  };

  // Either use existing id to call next or generate a new one
  if (id) {
    correlator.withId(id, () => {
      logRequest(req, next);
    });
  } else {
    correlator.withId(() => {
      logRequest(req, next);
    });
  }
}
