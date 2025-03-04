import mongoose from 'mongoose';
import { COMMENT } from './commentModule.js';
import { POST } from './postModule.js';
import { USER } from './userModule.js';
import { FAVORITE } from './favoriftModule.js';
import { LIKE } from './likeModule.js';
import { MENTION } from './mentionModule.js';
import { REPLY } from './replyModule.js';
import { STATICDATA } from './staticdataModule.js';
import { verificationCode } from './verificationcodeModule.js';

export const POSTS = mongoose.model('POSTS', POST)
export const COMMENTS = mongoose.model('COMMENTS', COMMENT)
export const REPLYS = mongoose.model('REPLYS', REPLY)
export const USERS = mongoose.model('USERS', USER)
export const LIKES = mongoose.model('LIKES', LIKE)
export const FAVORITES = mongoose.model('FAVORITES', FAVORITE)
export const STATICDATAS = mongoose.model('STATICDATAS', STATICDATA)
export const MENTIONS = mongoose.model('MENTIONS', MENTION)
export const verificationCodes = mongoose.model('verificationCodes', verificationCode)
// export const connect = () => {
//     mongoose.connect('mongodb://localhost:27017').catch(error => handleError(error))
//     mongoose.connection.on('error', error => { console.log(error); })
//     mongoose.connection.once('connected', () => {
//         console.log('mongodb is connected');
//     })
// // }
// import  { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = "mongodb+srv://kaixing:kaixing@towel.75stw.mongodb.net/?retryWrites=true&w=majority&appName=towel";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
const DATABASE_PASSWORD=process.env.DATABASE_PASSWORD;

mongoose.connect(DATABASE_PASSWORD).then(() => {
    console.log('MongoDB 连接成功');
}).catch(error => {
    console.error('连接失败', error);
});