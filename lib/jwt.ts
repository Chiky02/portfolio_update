import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export type AuthPayload = JWTPayload & {
  userId: string;
  email: string;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: { userId: string; email: string }) {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as AuthPayload;
}
