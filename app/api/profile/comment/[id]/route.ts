import { COMMENTS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
//获取用户发布的评论
export const GET = async (req:Request,{ params }: any) => {
  try {
    const { id } = await params;
    const data = await COMMENTS.aggregate([
      {
        $match: {
          commentDelete: false,
        },
      },
      {
        $match: {
          commentUserId: new ObjectId(`${id}`),
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
        $project: {
          _id: 1,
          commentText: 1,
          commentLike: { $size: "$likes" },
          commentImages: 1,
          postId: 1,
          /* 'postImages.staticUrl': 1, */
          "users.username": 1,
          "users._id": 1,
          "users.headimg": 1,
        },
      },
    ]);
    return NextResponse.json(data, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
