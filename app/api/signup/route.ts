import bcrypt from "bcrypt";
import { USERS } from "@/models/db";
import { NextResponse } from "next/server";
import redisClient from "@/redis";

export async function POST(request: Request) { 
 try {
    const { username, password, email} = await request.json();
    const userAndemail = await USERS.findOne({
      $or: [{ username }, { email }],
    }); 
    const rediskey=`nodemailerRegister:${email}`;
    const user= await redisClient.get(`nodemailerRegister:${email}`);
    if (!(userAndemail || user)) {
        return NextResponse.json(
            { message: "验证码错误" },
            { status: 401 }
          );
    }
    await redisClient.del(rediskey);
    const hashpassword = await bcrypt.hash(password, 10);
    const userdata = new USERS({
      username,
      password: hashpassword,
      email,
      createDate: new Date(),
      premium: false,
    });
    await userdata.save();
    return NextResponse.json(
        { message: "注册成功" },
        { status: 201 }
      );
  } catch {
    return NextResponse.json(
        { message: "服务器错误" },
        { status: 504 }
      );
  }
}
