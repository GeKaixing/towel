import { NextResponse } from "next/server";
import OpenAI from "openai";
export const POST = async (req: Request) => {
  const { message } = await req.json();
  const openai = new OpenAI({
    // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  });
  const completion = await openai.chat.completions.create({
    model: "deepseek-v3", // 此处以 deepseek-r1 为例，可按需更换模型名称。
    messages: [{ role: "user", content: message }],
  });
  return NextResponse.json(
    { message: completion.choices[0].message.content },
    { status: 200 }
  );
};
