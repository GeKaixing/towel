import mongoose from 'mongoose'
export const FAVORITE = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectID, required: true, ref: 'USERS' },
    targetType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectID, required: true },
})