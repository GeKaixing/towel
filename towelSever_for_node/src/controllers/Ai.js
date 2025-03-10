import axios from "axios";
import OpenAI from "openai";
import punycode from 'punycode';
// Ai接口
// llama 3.1
export const llamaApi = (req, res) => {
  const { context } = req.body.data;
  // 设置响应类型为流式
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  axios
    .post("http://localhost:11434/api/chat", {
      model: "llama3.2:1b",
      messages: [
        {
          role: "user",
          content: context,
        },
      ],
      stream: true,
    },{ responseType: 'stream' })
    .then((response) => {
      response.data.on("data", (chunk) => {
        // 每次收到数据块时，逐字输出
        res.write(chunk);
      });

      response.data.on("end", () => {
        // 结束流时，结束响应
        res.end();
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
};
// deepseek v3
export const deepseekApi = async (req, res) => {
  console.log(req.body.data.context,'dd')
  try {
    const openai = new OpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    });

    res.setHeader("Content-Type", "text/plain;charset=utf-8");

    const response = await openai.chat.completions.create({
      model: "deepseek-v3",
      messages: [
        { role: "user", content: req.body.data.context }
      ],
      stream: true,
    });

    response.data.on("data", (chunk) => {
      res.write(chunk);
    });

    response.data.on("end", () => {
      res.end();
    });

  } catch (error) {
    res.status(500).send({ message: error });
  }
};