const mongoose = require('mongoose')
const USER = new mongoose.Schema({
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
        default: 'http://127.0.0.1:4000/defaultheadimg.png'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        default: '无'
    },
    birthday: {
        type: String,
        default: '无'
    },
    auth:{
        type: String,
        default: '无'
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
    createDate:{
        type: String,
        required: true,
    }
})
module.exports = USER;