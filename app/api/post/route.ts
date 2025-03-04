import { POSTS } from "@/models/db";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    // 查询所有数据
    const posts = await POSTS.aggregate([
      {
        $match: {
          postDetele: false,
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
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
export const POST = async (Request: Request) => {
  const {
    UserId,
    Image,
    Text,
    Share,
    Like,
    Comment,
    Video,
    Title,
    createDate,
  } = await Request.json();
  const data = new POSTS({
    postUserId: UserId,
    postText: Text,
    postImages: Image,
    postVideos: Video,
    postShare: Share,
    postLike: Like,
    postComment: Comment,
    postTitle: Title,
    postCreateDate: createDate,
  });
  try {
    const datatosave = await data.save();
    return NextResponse.json(datatosave, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
