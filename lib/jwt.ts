import {sign, verify} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export type JwtPayload = {
  authorized: boolean;
};

export function signJwt(payload: JwtPayload) {
  return sign(payload, JWT_SECRET, {
    expiresIn: "12h",
  });
}

export function verifyJwt(token: string): JwtPayload {
  return verify(token, JWT_SECRET) as JwtPayload;
}