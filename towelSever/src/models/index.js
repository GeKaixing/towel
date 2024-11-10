import mongoose from 'mongoose';
import {COMMENT} from './commentModule.js';
import {POST} from './postModule.js';
import {USER} from './userModule.js';
import {FAVORITE} from './favoriftModule.js';
import {LIKE} from './likeModule.js';
import {MENTION} from './mentionModule.js';
import {REPLY} from './replyModule.js';
import {STATICDATA} from './staticdataModule.js';
import {verificationCode} from './verificationcodeModule.js';

export const POSTS = mongoose.model('POSTS', POST)
export const COMMENTS = mongoose.model('COMMENTS', COMMENT)
export const REPLYS = mongoose.model('REPLYS', REPLY)
export const USERS = mongoose.model('USERS', USER)
export const LIKES = mongoose.model('LIKES', LIKE)
export const FAVORITES = mongoose.model('FAVORITES', FAVORITE)
export const STATICDATAS = mongoose.model('STATICDATAS', STATICDATA)
export const MENTIONS = mongoose.model('MENTIONS', MENTION)
export const verificationCodes = mongoose.model('verificationCodes', verificationCode)
