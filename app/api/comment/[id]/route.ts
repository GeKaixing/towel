import { COMMENTS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
// 获取评论
export async function GET(request: Request, { params }: { params: any }) {
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
          postId: new ObjectId(`${id}`),
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
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export interface Comment {
  postId?: string;
  commentUserId: string;
  Text: string;
  Image: string;
  Like: number;
  CreateDate: string;
}
// 发布评论
export const POST = async (req: Request, { params }: { params: any }) => {
  const { id }: { id: string } = await params;
  try {
    const reqs = await req.json();
    const { commentUserId, Text, Image, Like, CreateDate }: Comment = reqs;
    if (!commentUserId || !CreateDate) {
      return NextResponse.json(
        { message: "commentUserId and CreateDate are required" },
        { status: 400 }
      );
    }
    const data = new COMMENTS({
      postId: new ObjectId(`${id}`),
      commentUserId: commentUserId,
      commentText: Text,
      commentImages: Image,
      commentLike: Like,
      commentCreateDate: CreateDate,
    });
    const datatosave = await data.save();
    return NextResponse.json(datatosave, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
