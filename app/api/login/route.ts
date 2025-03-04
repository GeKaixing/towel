import bcrypt from "bcrypt";
import { USERS } from "@/models/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const data = await request.json();
  const { username, password } = data;
  const cookieStore = await cookies();

  // 在数据库中查找用户
  const user = await USERS.findOne({ username });
  if (!user) {
    return NextResponse.json(
      {
        message: "账号或者密码错误",
      },
      { status: 401 }
    );
  }

  // 比较用户提供的密码和数据库中存储的哈希密码
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json(
      {
        message: "账号或者密码错误",
      },
      { status: 401 }
    );
  }

  // 如果密码匹配，生成 JWT 令牌
  const token = jwt.sign(
    { userid: user._id, username: username, headimg: user.headimg },
    "hello world",
    {
      expiresIn: "30d",
    }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  cookieStore.set("jwt", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  // 返回令牌和用户信息
  return NextResponse.json({
    userid: user._id,
    username: username,
    headimg:
      user.headimg ||
      "https://github.com/GeKaixing/towel/raw/main/README_static/logo.png",
    premium: user.premium,
  });
}
