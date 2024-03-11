import { request, Request, Response, NextFunction } from "express";
import correlator from "correlation-id";
import _ from "lodash";
import Logger from "@/utils/logger";

const truncateBase64Strings = (obj: any) => {
  _.forEach(obj, (value, key) => {
    if (_.isString(value) && value.startsWith("data:")) {
      obj[key] = "base64:..."; // Truncate the string
    } else if (_.isObject(value)) {
      truncateBase64Strings(value); // Recursively check nested objects
    }
  });
};

const logRequest = (req: Request, next: NextFunction) => {
  // Make a copy of the request body
  // so that we can mask the password
  let body = { ...req.body };

  if (body.password) {
    body.password = "********";
  }

  if (body.confirmPassword) {
    body.confirmPassword = "********";
  }

  // Truncate base64 strings
  //
  truncateBase64Strings(body);

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
    data?: any,
    logData: boolean = true
  ): Response {
    if (typeof data === "string") {
      data = {
        message: data,
      };
    }

    if (logData) {
      const cleanedData = truncateBase64Strings(_.cloneDeep(data));

      Logger.info(`${statusCode} Response`, cleanedData);
    } else Logger.info(`${statusCode} Response`);

    if (data)
      return this.status(statusCode).json({
        ...data,
      });
    else return this.sendStatus(statusCode);
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
