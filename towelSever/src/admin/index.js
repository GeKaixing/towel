const express = require("express");
const router = express();
const ObjectID = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const {
  POSTS,
  COMMENTS,
  REPLYS,
  USERS,
  LIKES,
  FAVORITES,
  STATICDATAS,
  MENTIONS,
  verificationCodes,
} = require("../DB/index");
router.get("/alluser", async (req, res) => {
  try {
    const data = await USERS.find();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/banuser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await USERS.findOneAndUpdate(
      { _id: userid },
      { ban: true },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
    );
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/offbanuser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await USERS.findOneAndUpdate(
      { _id: userid },
      { ban: false },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
    );
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/sealinguser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await USERS.findOneAndUpdate(
      { _id: userid },
      { sealing: true },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
    );
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/offsealinguser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await USERS.findOneAndUpdate(
      { _id: userid },
      { sealing: false },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
    );
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const data = await USERS.findByIdAndDelete(
      { _id: userid },
      { delete: true },
      { new: true, useFindAndModify: false }
    );
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/allpostadmin", async (req, res) => {
  try {
    const data = await POSTS.aggregate([
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
          postUserName:"$user.username",
          postCreateDate:1
        },
      },
    ]);

    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delpostadmin/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const delPost = await POSTS.findOneAndUpdate(
      { _id: postId },
      { postDetele: true },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send(delPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/updatatitlepostadmin/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const title = req.body.data.title;
    const delPost = await POSTS.findOneAndUpdate(
      { _id: postId },
      { postTitle: title },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为)
    );
    res.status(200).send(delPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/updatacontextpostadmin/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const text = req.body.data.text;
    const delPost = await POSTS.findOneAndUpdate(
      { _id: postId },
      { postText: text },
      { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为)
    );
    res.status(200).send(delPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/allcommentadmin", async (req, res) => {
  try {
    const data = await COMMENTS.aggregate([
      {
        $match: {
          commentDelete: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "commentUserId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
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
                    { $ne: ["$replyDelete", true] } // 过滤掉 delete 为 true 的回复
                  ]
                }
              }
            }
          ],
          as: "reply"
        }
      },
      {
        $project: {
          _id: 1,
          postId: 1,
          commentUserId: 1,
          commentText: 1,
          commentImages: 1,
          commentLike: 1,
          reply: { $size: "$reply" },
          username: "$user.username",
          userId: "$user._id",
          commentCreateDate: 1
        },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delcommentadmin/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const data = await COMMENTS.findOneAndUpdate(
      { _id: commentId },
      { commentDelete: true },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/allreplyadmin", async (req, res) => {
  try {
    const data = await REPLYS.aggregate([
      {
        $match: {
          replyDelete: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "replyUserId",
          foreignField: "_id",
          as: "user",
        },
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
        $unwind: "$replyToreplyUser",
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "replys",
          localField: "_id",
          foreignField: "commentId",
          as: "reply",
        },
      },

      {
        $project: {
          _id: 1,
          postId: 1,
          commentId: 1,
          replyUserId: 1,
          replyToreplyUserId: 1,
          replyText: 1,
          replyImages: 1,
          replyLike: 1,
          replyComment: 1,
          replyDelete: 1,
          username: "$user.username",
          userId: "$user._id",
          replyToreplyUserName: "$replyToreplyUser.username",
          replyToreplyUserId: "$replyToreplyUser._id",
          replyCreateDate: 1
        },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delreplyadmin/:id", async (req, res) => {
  try {
    const replyId = req.params.id;
    console.log(replyId);
    const data = await REPLYS.findOneAndUpdate(
      { _id: replyId },
      { replyDelete: true },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
