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
        default: 'http://127.0.0.1:4000/1eac4dd2-a292-4999-828d-ffa29c1fe1bc_test.png'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    birthday: {
        type: String,
    },
})
module.exports = USER;