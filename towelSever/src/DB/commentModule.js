const mongoose = require('mongoose')
const COMMENT = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectID, ref: 'POSTS' },
    commentUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    commentText: String,
    commentImages: String,
    commentLike: Number,
    commentComment: Number,
    commentDelete: { type: Boolean, default: false },
})
module.exports = COMMENT;