import { POSTS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    const { id } = params;
    // 67c5c461eb01687ecc5d3400
    // 校验 id 是否为有效的 ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const _id = new ObjectId(id);

    // 聚合查询
    const data = await POSTS.aggregate([
      // 匹配指定的 post
      {
        $match: { _id },
      },
      // 关联 users 集合
      {
        $lookup: {
          from: "users",
          localField: "postUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      // 展开 user 数组
      {
        $unwind: "$user",
      },
      // 关联 likes 集合
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "targetId",
          as: "likes",
        },
      },
      // 关联 comments 集合
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      // 选择返回的字段
      {
        $project: {
          _id: 1,
          postText: 1,
          postUserId: 1,
          postShare: 1,
          postImages: 1,
          postLike: { $size: "$likes" }, // 计算 likes 数量
          postComment: { $size: "$comments" }, // 计算 comments 数量
          "user.username": 1,
          "user.headimg": 1,
        },
      },
    ]);

    // 返回查询结果
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // 捕获并返回错误信息
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
