import bcrypt from "bcrypt";
import { USERS, verificationCodes } from "@/models/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json();
    const userAndemail = await USERS.findOne({
      $or: [{ username }, { email }],
    });

    const d = await verificationCodes.findOne({
      email: email,
      purpose: "account-registration",
    });
    if (!d) {
      return NextResponse.json({ message: "验证码错误" }, { status: 401 });
    }
    await verificationCodes.findOneAndDelete({
      email: email,
      purpose: "account-registration",
    });

    if (userAndemail) {
      return NextResponse.json({ message: "账号重复" }, { status: 401 });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const userdata = new USERS({
      username,
      password: hashpassword,
      email,
      createDate: new Date(),
      premium: false,
    });
    await userdata.save();
    return NextResponse.json({ message: "注册成功" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "服务器错误" }, { status: 504 });
  }
}
