import mongoose from 'mongoose';
import { COMMENT } from './commentModule.js';
import { POST } from './postModule.js';
import { USER } from './userModule.js';
import { FAVORITE } from './favoriftModule.js';
import { LIKE } from './likeModule.js';
import { MENTION } from './mentionModule.js';
import { REPLY } from './replyModule.js';
import { STATICDATA } from './staticdataModule.js';
import { verificationCode } from './verificationcodeModule.ts';

export const POSTS = mongoose.models.POSTS || mongoose.model('POSTS', POST)
export const COMMENTS = mongoose.models.COMMENTS || mongoose.model('COMMENTS', COMMENT)
export const REPLYS = mongoose.models.REPLYS || mongoose.model('REPLYS', REPLY)
export const USERS = mongoose.models.USERS || mongoose.model('USERS', USER)
export const LIKES = mongoose.models.LIKES || mongoose.model('LIKES', LIKE)
export const FAVORITES = mongoose.models.FAVORITES || mongoose.model('FAVORITES', FAVORITE)
export const STATICDATAS = mongoose.models.STATICDATAS || mongoose.model('STATICDATAS', STATICDATA)
export const MENTIONS = mongoose.models.MENTIONS || mongoose.model('MENTIONS', MENTION)
export const verificationCodes = mongoose.models.verificationCodes || mongoose.model('verificationCodes', verificationCode)
const DATABASE_PASSWORD=process.env.DATABASE_PASSWORD;
mongoose.connect(DATABASE_PASSWORD).then(() => {
    console.log('MongoDB 连接成功');
}).catch(error => {
    console.error('连接失败', error);
});