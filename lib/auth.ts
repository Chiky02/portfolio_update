import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken, type AuthPayload } from "@/lib/jwt";

const COOKIE_NAME = "admin_token";

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export { COOKIE_NAME };

export async function getAuthUser(): Promise<AuthPayload | null> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const bearer = headerStore.get("authorization")?.replace(/^Bearer\s+/i, "");
  const token = bearer || cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}
