const mongoose = require('mongoose')
const MENTION = new mongoose.Schema({
    /* 全部根据用户的id查选 */
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'POST' },//post ID
    bymentionUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//被@的用户的id/而这才是自己的id//根据这个ID进行查询
    mentionedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//用户id
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, },//类型的id
    targetType: { type: String, required: true },//类型
    targetText: { type: String, required: true },//被提及的内容
    createdAt: { type: Date, default: Date.now },//创建的时间
    read: { type: Boolean, default: false }//是否读取
});
module.exports=MENTION