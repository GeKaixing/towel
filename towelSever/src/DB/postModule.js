const mongoose = require('mongoose')
const POST = new mongoose.Schema({
    // postUserImage: String,//header 字段 
    //postUserName: String,//username 字段
    postUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    postText: String,
    postImages: String,
    postVideos: String,
    postShare: Number,
    postLike: Number,
    postComment: Number,
    postFavorite: {
        type: Number,
        default: 0
    },
});
module.exports = POST;