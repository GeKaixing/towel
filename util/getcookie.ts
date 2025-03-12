"use server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCookie() {
  "use server";
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const cookie = cookieStore.get("jwt");
  if (!cookie) return undefined;
  if (typeof cookie === "object") {
    if (typeof cookie.value === "string") {
      const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET);
      return decoded ?? undefined;
    }
  }
}
