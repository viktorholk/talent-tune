import jwt from "jsonwebtoken";

export function signToken(user: any) {
  const secret = process.env.TOKEN_SECRET as string;
  return jwt.sign(user, secret, { expiresIn: "24h" });
}

export default { signToken };
