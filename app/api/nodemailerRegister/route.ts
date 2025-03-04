import { USERS } from "@/models/db";
import redisClient from "@/redis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 邮箱验证
export const POST = async (request: Request) => {
  try {
    const { username, email } = await request.json();
    const user = await USERS.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return NextResponse.json(
        { message: "账号或邮件已经存在" },
        { status: 401 }
      );
    }
    const rediskey = `nodemailerRegister:${email}`;
    const existingCode = await redisClient.get(rediskey);
    if (existingCode) {
      return NextResponse.json(
        { message: `您的验证码已发送，请稍后再试` },
        { status: 200 }
      );
    }
    /* 生产五位数的验证码的函数
     *  五位数的验证码
     */
    function generateVerificationCode() {
      const min = 10000;
      const max = 99999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const code = generateVerificationCode();
    const transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      port: 587,
      secure: false,
      auth: {
        user: "2890901420@qq.com", // 你的邮箱地址
        pass: "ksbyznjdtmhjdghh", // 你的邮箱密码
      },
    });
    const mailOptions = {
      from: "2890901420@qq.com",
      to: `${email}`,
      subject: "Verification Code for Registration",
      text: `Your verification code is: ${code}. Please use this code to complete your registration process.`,
    };
    transporter.sendMail(
      mailOptions,
      (error: Error | null, info:any ) => {
        if (error) {
          console.log("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      }
    );
    //5分钟过期
    await redisClient.set(rediskey, code, { EX: 300 });
    return NextResponse.json(
      { message: "您的验证码已经到达邮件,注意5分钟后过期" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in nodemailerRegisterApi:", error);
    return NextResponse.json({ message: "服务区错误" }, { status: 501 });
  }
};
