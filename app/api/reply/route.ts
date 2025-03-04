import { MENTIONS, REPLYS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
// 发布回复
export const POST = async (req: Request) => {
    try {
      const {
        postId, //文章id
        commentId,
        replyUserId,
        replyToreplyUserId,
        replyText,
        replyImages,
        replyLike,
        replyComment,
        CreateDate,
      } = await req.json();
      const data = new REPLYS({
        postId: new ObjectId(`${postId}`),
        commentId: new ObjectId(`${commentId}`),
        replyToreplyUserId: replyToreplyUserId,
        replyUserId: replyUserId,
        replyText: replyText,
        replyImages: replyImages,
        replyLike: replyLike,
        replyComment: replyComment,
        replyCreateDate: CreateDate,
      });
      const datatosave = await data.save();
      // 保存数据做消息推送
      if (replyToreplyUserId) {
        const mention = new MENTIONS({
          postId,
          bymentionUserId: replyToreplyUserId,
          mentionedUserId: replyUserId,
          targetText: replyText,
          targetId: datatosave._id,
          targetType: "reply",
          createdAt: new Date(),
          read: false,
        });
        await mention.save();
      }
      return NextResponse.json(datatosave, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  };
  