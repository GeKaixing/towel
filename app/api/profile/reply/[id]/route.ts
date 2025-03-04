import { REPLYS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
//获取用户发布的回复
export const GET = async (req:Request,{ params }: any) => {
  try {
    const { id } = await params;
    const finddata = await REPLYS.aggregate([
      {
        $match: {
          replyDelete: false,
        },
      },
      {
        $match: {
          replyUserId: new ObjectId(`${id}`),
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
          localField: "replyToreplyUserId",
          foreignField: "_id",
          as: "replyToreplyUser",
        },
      },
      {
        $unwind: {
          path: "$replyToreplyUser",
          preserveNullAndEmptyArrays: true, // 保留空数组以处理可选字段
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
    return NextResponse.json(finddata, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
