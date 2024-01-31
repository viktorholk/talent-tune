import { Request, Response, NextFunction } from "express";
import AuthMiddleware from "@/middlewares/auth";
import { verifyToken } from "@/utils/auth";
import { IUser } from "@/models/types";

jest.mock("@/utils/auth");

describe("Auth Middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      sendResponse: jest.fn(),
    } as any;
    next = jest.fn();
  });

  it("should return 401 if no token provided", async () => {
    await AuthMiddleware(req, res, next);

    expect(res.sendResponse).toHaveBeenCalledWith(401, "Access Denied", false);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", async () => {
    req.headers = {
      authorization: "Bearer invalidToken",
    };

    (verifyToken as jest.Mock).mockReturnValueOnce(false);

    await AuthMiddleware(req, res, next);

    expect(res.sendResponse).toHaveBeenCalledWith(401, "Invalid Token", false);
    expect(next).not.toHaveBeenCalled();
  });

  it("should set user on request if token is valid", async () => {
    const validToken = "validToken";
    req.headers = {
      authorization: `Bearer ${validToken}`,
    };

    const testUser: IUser = {
      email: "test@test.com",
      password: "test",
    };

    (verifyToken as jest.Mock).mockReturnValueOnce(testUser);

    await AuthMiddleware(req, res, next);

    expect(req.user).toEqual(testUser);
    expect(next).toHaveBeenCalled();
  });
});
