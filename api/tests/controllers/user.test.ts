import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { create } from "@/controllers/user";
import { signToken } from "@/utils/auth";
import UserModel from "@/models/user";

jest.mock("@/utils/auth", () => ({ signToken: jest.fn(() => "mockedToken") }));

describe("User Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        name: "test",
        email: "test@test.com",
        password: "supersecret",
      },
    } as Request;
    res = {
      sendStatus: jest.fn(),
      sendResponse: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const findOneMock = jest
      .spyOn(UserModel, "findOne")
      .mockResolvedValue(null);
    const saveMock = jest
      .spyOn(UserModel.prototype, "save")
      .mockResolvedValueOnce({});

    await create(req, res);

    expect(findOneMock).toHaveBeenCalledWith({ email: req.body.email });
    expect(saveMock).toHaveBeenCalled();
    expect(res.sendResponse).toHaveBeenCalledWith(
      201,
      expect.objectContaining({ token: "mockedToken" }),
      false
    );
  });

  it("should handle existing user", async () => {
    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({});

    await create(req, res);

    expect(res.sendResponse).toHaveBeenCalledWith(403, "User already exists");
  });

  it("should handle missing parameters", async () => {
    req.body = {}; // Missing required parameters

    await create(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });
});
