const mongoose = require('mongoose')
const REPLY = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectID, ref: 'POSTS' },
    commentId: { type: mongoose.Schema.Types.ObjectID, ref: 'COMMENT' },
    replyUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    replyToreplyUserId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'USERS' // 关联的模型名称  
    },
    replyText: String,
    replyImages: String,
    replyLike: Number,
    replyComment: Number,
})
module.exports=REPLY;