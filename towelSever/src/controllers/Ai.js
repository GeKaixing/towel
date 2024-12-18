import axios from "axios";

// Ai接口
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
