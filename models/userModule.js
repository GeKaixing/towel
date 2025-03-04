import mongoose from 'mongoose'
export const USER = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    headimg: {
        type: String,
        default: 'https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        default: null
    },
    birthday: {
        type: String,
        default: null
    },
    auth:{
        type: String,
        default: null
    },
    delete:{
        type:Boolean,
        default:false
    },
    ban:{
        type:Boolean,
        default: false
    },
    sealing:{
        type:Boolean,
        default: false
    },
    premium:{
        type:Boolean ,
        required: true,
        default: false
    },
    createDate:{
        type: String,
        required: true,
    }
})