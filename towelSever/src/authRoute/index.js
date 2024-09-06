const router = require('express').Router();
const ObjectID = require('mongodb').ObjectId;
const mongoose = require('mongoose');
const {
    POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes } = require('../DB/index');
router.get('/getusepost/:id', async (req, res) => {
    try {
        const useId = req.params.id;
        const useByPost = await POSTS.aggregate([
            {
                $match: {
                    postUserId: new ObjectID(`${useId}`)
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
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
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
                    postImages:1,
                    // 'postImages.staticUrl': 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        console.log(useByPost)
        res.status(200).send(useByPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//根据用户id查询相对应的comment，返回给用户信息进行展示
router.get('/getusecomment/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await COMMENTS.aggregate([
            {
                $match: {
                    commentUserId: new ObjectID(`${_id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'commentUserId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $project: {
                    _id: 1,
                    commentText: 1,
                    commentLike: { $size: '$likes' },
                    commentImages: 1,
                    postId: 1,
                    /* 'postImages.staticUrl': 1, */
                    'users.username': 1,
                    'users._id': 1,
                    'users.headimg': 1
                }
            }
        ])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//根据用户id查询相对应的reply，返回给用户信息进行展示
router.get('/getusereply/:id', async (req, res) => {
    try {
        const userId = req.params.id
        /*         { 'commentId': { $eq: new ObjectID(`${commentId}`) } } */
        const finddata = await REPLYS.aggregate(
            [
                {
                    $match: {
                        replyUserId: new ObjectID(`${userId}`)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyUserId',
                        foreignField: '_id',
                        as: 'replyUser'
                    }
                },
                {
                    $unwind: '$replyUser'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyToreplyUserId',
                        foreignField: '_id',
                        as: 'replyToreplyUser'
                    }
                },
                {
                    $unwind: {
                        path: '$replyToreplyUser',
                        preserveNullAndEmptyArrays: true // 保留空数组以处理可选字段
                    }
                },
                {
                    $lookup: {
                        from: 'likes',
                        localField: '_id',
                        foreignField: 'targetId',
                        as: 'likes'
                    }
                },
                {
                    $addFields: {
                        replyLike: { $size: '$likes' },
                    }
                },
                {
                    $project: {
                        'likes': 0,
                        'replyUser.password': 0,
                        'replyUser._id': 0,
                        'replyToreplyUser.password': 0,
                        'replyToreplyUser._id': 0,
                    }
                }
            ]
        )
        res.status(200).send(finddata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is find one the post API
router.get('/findonepost/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await POSTS.aggregate([
            {
                $match: {
                    _id: new ObjectID(`${_id}`)
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
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
           /*  {
                $lookup: {
                    from: 'staticdatas',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'postImages'
                }
            }, */
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postText: 1,
                    postUserId: 1,
                    postShare: 1,
                    postImages:1,
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                  /*   'postImages.staticUrl': 1, */
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is addition the post API
router.post('/addpost', async (req, res) => {
    const { UserId, Image, Text, Share, Like, Comment,Video,Title,createDate } = req.body.data
    const data = new POSTS({
        postUserId: UserId,
        postText: Text,
        postImages: Image,
        postVideos: Video,
        postShare: Share,
        postLike: Like,
        postComment: Comment,
        postTitle:Title,
        postCreateDate:createDate,
    })
    try {
        const datatosave = await data.save()
        res.status(200).send(datatosave)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is delete the post API
router.delete('/delpost/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const delPost = await POSTS.findByIdAndDelete({ _id: postId })
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
})
//this is updata the post API
router.patch('/uppost/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const { UserImage, UserName, Image, Text, Share, Like, Comment } = req.body.data
        const data = await POSTS.findOneAndUpdate({ _id: postId }, {
            postUserImage: UserImage,
            postUserName: UserName,
            postText: Text,
            postImages: Image,
            postShare: Share,
            postLike: Like,
            postComment: Comment,
        }, { new: true })
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//this is an api for add comments 
router.post('/addcomment/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const { commentUserId, Text, Image, Like } = req.body.data
        const data = new COMMENTS({
            postId: new ObjectID(`${_id}`),
            commentUserId: commentUserId,
            commentText: Text,
            commentImages: Image,
            commentLike: Like,
        })
        const datatosave = await data.save()
        res.status(200).send(datatosave)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is an api for deleting comments API
router.delete('/delcomment/:id', async (req, res) => {
    try {
        const commentId = req.params.id
        const delComment = await COMMENTS.findByIdAndDelete(commentId)
        res.status(200).send(delComment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
/* 
comment API is not updata and  it that late
*/
/* 
below is reply API
*/
//this is an api for add reply API
router.post('/addreply', async (req, res) => {
    try {
        const {
            postId,//文章id
            commentId,
            replyUserId,
            replyToreplyUserId,
            replyText,
            replyImages,
            replyLike,
            replyComment
        } = req.body.data
        const data = new REPLYS({
            postId: new ObjectID(`${postId}`),
            commentId: new ObjectID(`${commentId}`),
            replyToreplyUserId: replyToreplyUserId,
            replyUserId: replyUserId,
            replyText: replyText,
            replyImages: replyImages,
            replyLike: replyLike,
            replyComment: replyComment
        })
        const datatosave = await data.save()
        // 保存数据做消息推送
        if (replyToreplyUserId) {
            const mention = new MENTIONS({
                postId,
                bymentionUserId: replyToreplyUserId,
                mentionedUserId: replyUserId,
                targetText: replyText,
                targetId: datatosave._id,
                targetType: 'reply',
                createdAt: new Date(),
                read: false
            });
            await mention.save();
        }
        res.status(200).send(datatosave)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is an api for delete reply API
router.delete('/delreply/:id', async (req, res) => {
    try {
        const replyId = req.params.id
        const delReply = await REPLYS.findByIdAndDelete(replyId)
        res.status(200).send(delReply)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
/*  likeAPI函数
      参数1：路径
      参数2：类型
      返回值：点赞api
  */

const likeRouter = function (url, targetType) {
    const url_value = url;
    const targetType_value = targetType;
    router.post(url_value, async (req, res) => {
        try {

            const commentId = req.params.id;
            const userId = req.body.data.userId;
            const existingLike = await LIKES.findOne({
                userId: new mongoose.Types.ObjectId(userId),
                targetType: targetType_value,
                targetId: new mongoose.Types.ObjectId(commentId)
            });
            if (existingLike) {
                const likes = await LIKES.find({ targetType: targetType_value, targetId: new mongoose.Types.ObjectId(commentId) });
                return res.status(200).json({ message: '已经点赞了，不能重复点赞', likenum: likes.length });
            } else {
                const newLike = new LIKES({
                    userId: new mongoose.Types.ObjectId(userId),
                    targetType: targetType_value,
                    targetId: new mongoose.Types.ObjectId(commentId)
                });
                await newLike.save();
                const likes = await LIKES.find({ targetType: targetType_value, targetId: new mongoose.Types.ObjectId(commentId) });
                res.status(201).json({ newLike, likenum: likes.length });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}

//点赞post
likeRouter('/post/like/:id', 'post');
// 点赞评论
likeRouter('/comments/like/:id', 'comment');
// 点赞回复
likeRouter('/replies/like/:id', 'reply');

//收藏post API
router.post('/post/favorite/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.data.userId;
        const existingLike = await FAVORITES.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            targetType: 'post',
            targetId: new mongoose.Types.ObjectId(postId)
        });
        if (existingLike) {
            const likes = await FAVORITES.find({ targetType: 'post', targetId: new mongoose.Types.ObjectId(postId) });
            return res.status(200).json({ message: '已经收藏了，不能重复收藏', likenum: likes.length });
        } else {
            const newLike = new FAVORITES({
                userId: new mongoose.Types.ObjectId(userId),
                targetType: 'post',
                targetId: new mongoose.Types.ObjectId(postId)
            });
            await newLike.save();
            const likes = await FAVORITES.find({ targetType: 'post', targetId: new mongoose.Types.ObjectId(postId) });
            res.status(201).json({ newLike, likenum: likes.length });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//delete like button
router.delete('/dellike/:id', async (req, res) => {
    try {
        const likeid = req.params.id
        const deledata = await LIKES.findByIdAndDelete(likeid)
        res.status(200).send(deledata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/notifications/:userid', async (req, res) => {
    try {
        const userid = req.params.userid
        /* 被提及的才是自己的id */
        const data = await MENTIONS.aggregate([
            {
                $match: {
                    targetType: 'reply',
                    bymentionUserId: new ObjectID(`${userid}`),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bymentionUserId',
                    foreignField: '_id',
                    as: 'bymentionUserId'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'mentionedUserId',
                    foreignField: '_id',
                    as: 'mentionedUserId'
                }
            },
            {
                $project: {
                    'bymentionUser.password': 0,
                    'mentionedUserId.password': 0,
                }
            }
        ]);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

router.post('/readnotifications/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await MENTIONS.findOneAndUpdate(
            { _id: id },
            { read: true },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})
router.delete('/delnotifications/:id', async (req, res) => {
    try {
        const Id = req.params.id
        const delPost = await MENTIONS.findByIdAndDelete({ _id: Id })
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
})

module.exports = router;