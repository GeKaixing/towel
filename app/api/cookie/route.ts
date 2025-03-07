import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function GET() {
  const cookie = await cookies();
  if (cookie.get("jwt")) {
    const decoded = jwt.verify(cookie.get("jwt")?.value, process.env.JWT_SECRET);
    return Response.json(decoded);
  }
  return Response.json({ message: "No cookie" });
};
