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
})
module.exports = USER;