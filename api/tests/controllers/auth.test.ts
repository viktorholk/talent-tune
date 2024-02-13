import { Request, Response } from "express";
import { createToken } from "@/controllers/auth";
import { signToken } from "@/utils/auth";
import UserModel from "@/models/user";

jest.mock("@/utils/auth", () => ({ signToken: jest.fn(() => "mockedToken") }));

describe("Token Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        email: "test@test.com",
        password: "supersecret",
      },
    } as Request;
    res = {
      sendResponse: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and send a token for valid user", async () => {
    const findOneMock = jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      _id: "mockUserId",
      name: "test",
      email: "test@etest.com",
      checkPassword: jest.fn().mockResolvedValue(true), // Mock checkPassword to always return true
      toObject: jest.fn().mockReturnValue({
        _id: "mockUserId",
        name: "test",
        email: "test@etest.com",
      }),
      isCompany: jest.fn().mockReturnValue(false),
    });

    await createToken(req, res);

    expect(findOneMock).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.sendResponse).toHaveBeenCalledWith(
      200,
      {
        token: "mockedToken",
      },
      false
    );
  });

  it("should handle missing parameters", async () => {
    req.body = {}; // Missing required parameters

    await createToken(req, res);

    expect(res.sendResponse).toHaveBeenCalledWith(400);
  });

  it("should handle invalid email or password", async () => {
    const findOneMock = jest
      .spyOn(UserModel, "findOne")
      .mockResolvedValueOnce(null);

    await createToken(req, res);

    expect(findOneMock).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.sendResponse).toHaveBeenCalledWith(
      403,
      "Invalid email or password"
    );
  });

  it("should handle invalid password", async () => {
    const findOneMock = jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      _id: "mockUserId",
      name: "test",
      email: "test@test.com",
      checkPassword: jest.fn().mockResolvedValue(false), // Mock checkPassword to always return false
    });

    await createToken(req, res);

    expect(findOneMock).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.sendResponse).toHaveBeenCalledWith(
      403,
      "Invalid email or password"
    );
  });
});
