export const  postApi= async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;   // 当前页码
        const limit = parseInt(req.query.limit) || 10; // 每页数据量
        const skip = (page - 1) * limit;               // 跳过的条目数
        //
        const allPost = await POSTS.aggregate([
            {
                $match: {
                  postDetele: false,
                },
              },
              { $sort: { _id: 1 } }, // 按照 _id 升序排列
              { $skip: skip },       // 跳过前面的数据
              { $limit: limit },    // 取出指定数量的数据
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
                    from: 'favorites',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'favorites'
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
                    postImages: 1,
                    postVideos: 1,
                    postText: 1,
                    postDelete:1,
                    postTitle: 1,
                    postShare: 1,
                    postFavorite: { $size: '$favorites' },
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    /* 'postImages.staticUrl': 1, */
                    postUserId: 1,
                    'user.username': 1,
                    'user.headimg': 1,
                    postCreateDate:1,
                }   
            }
        ])
        res.status(200).send(allPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}