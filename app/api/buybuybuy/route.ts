import { USERS } from "@/models/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    // 需要使用 NextRequest 类型而不是普通的 Request
    // cookies() 只能在服务端组件中使用
    
    const { userid } = await request.json();
    if (!userid) {
      return NextResponse.json({ message: "未登录" }, { status: 401 });
    }
    await USERS.findOneAndUpdate(
      { _id: userid.userid },
      { premium: true }, 
      { new: true, useFindAndModify: false }
    );

    const { exp, iat, ...userDataWithoutExp } = userid;
    console.log(exp, iat);
    const token = jwt.sign(
      { ...userDataWithoutExp, premium: true },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    // 使用 NextResponse 设置 cookie
    const response = NextResponse.json(
      { message: "购买成功" },
      { status: 200 }
    );

    // 设置30天后过期
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // 在响应中设置cookie
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/"
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
