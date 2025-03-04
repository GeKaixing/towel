import { POSTS } from "@/models/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
//获取用户发布的文章
export const GET = async (req:Request, {params}:any) => {
    try {
        const {id} = await params
        const useByPost = await POSTS.aggregate([
            {
                $match: {
                    postDetele: false,
                },
            },
            {
                $match: {
                    postUserId: new ObjectId(`${id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    user: '$user'
                }
            },
            {
                $lookup: {
                    from: 'likes',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'favorites',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'favorites'
                }
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
                                        { $ne: ["$commentDelete", true] } // 过滤掉 delete 为 true 的评论
                                    ]
                                }
                            }
                        }
                    ],
                    as: "comments"
                }
            },
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postText: 1,
                    postShare: 1,
                    postUserId: 1,
                    postFavorite: { $size: '$favorites' },
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    postImages: 1,
                    // 'postImages.staticUrl': 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        return NextResponse.json(useByPost, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}