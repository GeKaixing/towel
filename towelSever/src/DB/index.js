const mongoose = require('mongoose')
const COMMENT = require('./commentModule')
const POST = require('./postModule')
const USER = require('./userModule')
const FAVORITE = require('./favoriftModule')
const LIKE = require('./likeModule')
const MENTION = require('./mentionModule')
const REPLY = require('./replyModule')
const STATICDATA = require('./staticdataModule')
const verificationCode = require('./verificationcodeModule')
const POSTS = mongoose.model('POSTS', POST)
const COMMENTS = mongoose.model('COMMENTS', COMMENT)
const REPLYS = mongoose.model('REPLYS', REPLY)
const USERS = mongoose.model('USERS', USER)
const LIKES = mongoose.model('LIKES', LIKE)
const FAVORITES = mongoose.model('FAVORITES', FAVORITE)
const STATICDATAS = mongoose.model('STATICDATAS', STATICDATA)
const MENTIONS = mongoose.model('MENTIONS', MENTION)
const verificationCodes = mongoose.model('verificationCodes', verificationCode)
module.exports = {
    POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes
}