import mongoose from 'mongoose'
export const POST = new mongoose.Schema({
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
    postCreateDate:{
        type:String,
        required: true,
    },
    postDetele: {
        type: Boolean,
        default: false
    },
    postTitle: {
        type: String,
        default: ''
    },
    postFavorite: {
        type: Number,
        default: 0
    },
});