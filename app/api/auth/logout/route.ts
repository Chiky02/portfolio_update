import { NextResponse } from "next/server";
import { COOKIE_NAME, authCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { ...authCookieOptions(), maxAge: 0 });
  return response;
}
