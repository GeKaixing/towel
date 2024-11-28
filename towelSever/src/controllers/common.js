import {
  POSTS,
  COMMENTS,
  REPLYS,
  USERS,
  verificationCodes,
} from "../models/index.js";
import Objectid from "mongodb";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redisClient from "../redis/index.js";

const ObjectID = Objectid.ObjectId;

// 获取所有文章
export const postApi = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // 当前页码
    const limit = parseInt(req.query.limit) || 10; // 每页数据量
    const skip = (page - 1) * limit; // 跳过的条目数
    //
    const allPost = await POSTS.aggregate([
      {
        $match: {
          postDetele: false,
        },
      },
      { $sort: { _id: 1 } }, // 按照 _id 升序排列
      { $skip: skip }, // 跳过前面的数据
      { $limit: limit }, // 取出指定数量的数据
      {
        $lookup: {
          from: "users",
          localField: "postUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          user: "$user",
        },
      },
      {
        $lookup: {
          from: "favorites", //这里要填mongoose compass的集合的名字
          localField: "_id",
          foreignField: "targetId",
          as: "favorites",
        },
      },
      {
        $lookup: {
          from: "likes", //这里要填mongoose compass的集合的名字
          localField: "_id",
          foreignField: "targetId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$postId", "$$postId"] }, // 匹配 postId
                    { $ne: ["$commentDelete", true] }, // 过滤掉 delete 为 true 的评论
                  ],
                },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $project: {
          _id: 1,
          /* postUserImage: 1,
                    postUserName: 1, */
          postImages: 1,
          postVideos: 1,
          postText: 1,
          postDelete: 1,
          postTitle: 1,
          postShare: 1,
          postFavorite: { $size: "$favorites" },
          postLike: { $size: "$likes" },
          postComment: { $size: "$comments" },
          /* 'postImages.staticUrl': 1, */
          postUserId: 1,
          "user.username": 1,
          "user.headimg": 1,
          postCreateDate: 1,
        },
      },
    ]);
    res.status(200).send(allPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//登录
export const loginApi = async (req, res) => {
  try {
    const { username, password } = req.body.data;
    const user = await USERS.findOne({ username });
    if (!user) {
      return res.status(400).json({ meassge: "账号或者密码错误" });
    }
    const passworMatch = await bcrypt.hash(password, user.password);
    if (!(passworMatch === user.password)) {
      return res.status(401).json({ meassge: "账号或者密码错误" });
    }
    const token = jwt.sign({ userid: user._id }, "hello world", {
      expiresIn: "30d",
    });
    res.status(200).json({
      jwt: token,
      userid: user._id,
      username: username,
      headimg: user.headimg,
      premium: user.premium,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 注册
export const registerApi = async (req, res) => {
  try {
    const { username, password, email, code, createDate } = req.body.data;
    console.log(username, password, email, createDate )
    const userAndemail = await USERS.findOne({
      $or: [{ username }, { email }],
    }); //false
    // const user = await verificationCodes.findOne({ verificationCode: code }); //true
    const rediskey=`nodemailerRegister:${email}`;
    const user= await redisClient.get(`nodemailerRegister:${email}`);
    console.log('dddd'+user)
    if (!(userAndemail || user)) {
      return res.status(400).json({ meassge: "验证码错误", status: false });
    }
    await redisClient.del(rediskey);
    // await verificationCodes.deleteOne({ verificationCode: code });
    const hashpassword = await bcrypt.hash(password, 10);
    const userdata = new USERS({
      username,
      password: hashpassword,
      email,
      createDate:createDate
    });
    await userdata.save();
    res.status(201).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 邮箱验证
export const nodemailerRegisterApi = async (req, res) => {
  try {
    const { username, password, email } = req.body.data;
    const user = await USERS.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ meassge: "账号或邮件已经存在" });
    }
    const rediskey = `nodemailerRegister:${email}`;
    const existingCode = await redisClient.get(rediskey);
    console.log(existingCode)
    if (existingCode) {
      return res.status(200).json({
          message: `您的验证码已发送，请稍后再试`,
      });
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
    /* const verificationCode = new verificationCodes({
      verificationCode: code,
    });
    await verificationCode.save(); */
    /*
     * 发送确认邮件的函数
     * 创建一个Nodemailer传输器
     *
     */
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
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    //5分钟过期
    await redisClient.set(rediskey, code, { EX: 300 });

    res.status(201).json({
      message: `您的验证码已经到达邮件,注意5分钟后过期`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//忘记密码 验证码
export const forgetpasswordverificationcodeApi = async (req, res) => {
  try {
    const { username, email } = req.body.data;
    const user = await USERS.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(400).json({ meassge: "账号或邮件未存在" });
    }
        const rediskey=`forgetpasswordverificationcode:${email}`;
        const existingCode=await redisClient.get(rediskey);
        if (existingCode) {
          return res.status(200).json({
              message: `您的验证码已发送，请稍后再试`,
          });
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
    const verificationCode = new verificationCodes({
      verificationCode: code,
    });
    await verificationCode.save();
    /*
     * 发送确认邮件的函数
     * 创建一个Nodemailer传输器
     *
     */
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
      subject: "forget password code",
      text: `您的验证码: ${code}.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  
    await redisClient.set(rediskey, code, { EX: 300 })

    res.status(201).json({
      message: `您的验证码已经到达邮件,注意5分钟后过期`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 忘记密码 api
export const forgetpasswordApi = async (req, res) => {
  try {
    const { username, email, code, password } = req.body.data;
    const userAndemail = await USERS.findOne({
      $or: [{ username }, { email }],
    }); //false
    const user=await redisClient.get(`forgetpasswordverificationcode:${email}`);
    // const user = await verificationCodes.findOne({ verificationCode: code }); //true
    if (!(userAndemail || user)) {
      return res.status(400).json({ meassge: "验证码错误", status: false });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const data = await USERS.findOneAndUpdate(
      { email: email },
      {
        username,
        password: hashpassword,
        email,
      },
      { new: true }
    );
    await redisClient.del(`forgetpasswordverificationcode:${email}`)
    res.status(201).json({ data, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//过滤帖子
export const fliterpsotApi = async (req, res) => {
  try {
    const filtertarget = req.body.data.postText;
    const result = await POSTS.aggregate([
      {
        $match: {
          postDetele: false,
        },
      },
      {
        $match: {
          postText: {
            $regex: filtertarget,
            $options: "i",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $lookup: {
          from: "favorites", //这里要填mongoose compass的集合的名字
          localField: "_id",
          foreignField: "targetId",
          as: "favorites",
        },
      },
      {
        $lookup: {
          from: "likes", //这里要填mongoose compass的集合的名字
          localField: "_id",
          foreignField: "targetId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$postId", "$$postId"] }, // 匹配 postId
                    { $ne: ["$commentDelete", true] }, // 过滤掉 delete 为 true 的评论
                  ],
                },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "staticdatas",
          localField: "_id",
          foreignField: "targetId",
          as: "postImages",
        },
      },
      {
        $project: {
          _id: 1,
          /* postUserImage: 1,
                    postUserName: 1, */
          postText: 1,
          postVideos: 1,
          postUserId: 1,
          postFavorite: { $size: "$favorites" },
          postShare: 1,
          postLike: { $size: "$likes" },
          postComment: { $size: "$comments" },
          "postImages.staticUrl": 1,
          "user.username": 1,
          "user.headimg": 1,
          postCreateDate: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ meassge: error.meassge });
  }
};

// 获取评论
export const commentApi = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await COMMENTS.aggregate([
      {
        $match: {
          commentDelete: false,
        },
      },
      {
        $match: {
          postId: new ObjectID(`${_id}`),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "commentUserId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "targetId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "replys",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$commentId", "$$commentId"] }, // 匹配 commentId
                    { $ne: ["$replyDelete", true] }, // 过滤掉 delete 为 true 的回复
                  ],
                },
              },
            },
          ],
          as: "reply",
        },
      },
      {
        $project: {
          _id: 1,
          commentText: 1,
          postId: 1,
          commentLike: { $size: "$likes" },
          commentImages: 1,
          /* 'postImages.staticUrl': 1, */
          "users.username": 1,
          "users.headimg": 1,
          "users._id": 1,
          commentCreateDate: 1,
          reply: { $size: "$reply" },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 获取回复
export const allreplyApi = async (req, res) => {
  try {
    const commentId = req.params.id;

    // 确保 commentId 是一个合法的 ObjectId
    let objectId;
    try {
      objectId = new ObjectID(commentId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid commentId" });
    }

    const finddata = await REPLYS.aggregate([
      {
        $match: {
          replyDelete: false,
        },
      },
      {
        $match: {
          commentId: objectId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "replyUserId",
          foreignField: "_id",
          as: "replyUser",
        },
      },
      {
        $unwind: "$replyUser",
      },
      {
        $lookup: {
          from: "users",
          let: { replyToId: "$replyToreplyUserId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ["$$replyToId", null] },
                    { $ne: ["$$replyToId", ""] },
                    { $eq: ["$_id", "$$replyToId"] },
                  ],
                },
              },
            },
          ],
          as: "replyToreplyUser",
        },
      },
      {
        $addFields: {
          replyToreplyUser: {
            $cond: {
              if: { $eq: [{ $size: "$replyToreplyUser" }, 0] },
              then: [{}],
              else: { $arrayElemAt: ["$replyToreplyUser", 0] },
            },
          },
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "targetId",
          as: "likes",
        },
      },
      {
        $addFields: {
          replyLike: { $size: "$likes" },
        },
      },
      {
        $project: {
          likes: 0,
          "replyUser.password": 0,
          "replyUser._id": 0,
          "replyToreplyUser.password": 0,
          "replyToreplyUser._id": 0,
        },
      },
    ]);

    res.status(200).send(finddata);
  } catch (error) {
    console.error("Error:", error); // 打印错误信息
    res.status(500).json({ message: error.message });
  }
};
