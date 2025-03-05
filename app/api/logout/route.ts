import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // 删除 JWT cookie
  const userinfo = await cookies();
  userinfo.delete("jwt");
  return NextResponse.json({ message: "退出登录成功" });
}
