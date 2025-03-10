import mongoose from 'mongoose'
export const verificationCode = new mongoose.Schema({
    verificationCode: { type: String, required: true },//验证码
    creadfailureTime: { type: Date, default: Date.now },//创建的时间
});