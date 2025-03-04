import { REPLYS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
// 获取回复
export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    const { id } = await params;

    // 确保 commentId 是一个合法的 ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
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
    return NextResponse.json(finddata, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error); // 打印错误信息
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
