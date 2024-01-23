import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET as string;

export function signToken(user: any) {
  return jwt.sign(user, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (_) {
    return false;
  }
}

export default { signToken, verifyToken };
