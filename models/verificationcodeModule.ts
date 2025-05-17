// models/VerificationCode.ts
import mongoose from "mongoose";

export const verificationCode = new mongoose.Schema({
  email: { type: String, required: true }, // 邮箱
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // 用户 ID
  code: { type: String, required: true }, // 验证码
  purpose: { type: String, required: true }, // 用途
  expiresAt: { type: Date, required: true,index: { expires: 0 }  }, // 过期时间并且设置索引自动删除过期验证码
}, {
  timestamps: true // ✅ 自动添加 createdAt 和 updatedAt 字段
});


