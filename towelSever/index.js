const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;
const ObjectID = require('mongodb').ObjectId;
const app = express()
const http = require('http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const upload = multer({ dest: 'upload' }).single('file', 'text')
const fs = require('fs');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const { log } = require("console");
const { type } = require("os");
const server = http.createServer(app);
app.use(cors({ origin: 'http://localhost:3000' }))
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 4000;
mongoose.connect('mongodb://localhost:27017').catch(error => handleError(error))
mongoose.connection.on('error', error => { console.log(error); })
mongoose.connection.once('connected', () => {
    console.log('mongodb is connected');
})
const POST = new mongoose.Schema({
    // postUserImage: String,//header 字段 
    //postUserName: String,//username 字段
    postUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    postText: String,
    postImages: String,
    postShare: Number,
    postLike: Number,
    postComment: Number,
    postFavorite:{
        type:Number,
        default:0
    },
})
const COMMENT = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectID, ref: 'POSTS' },
    commentUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    commentText: String,
    commentImages: String,
    commentLike: Number,
    commentComment: Number,
})
const REPLY = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectID, ref: 'POSTS' },
    commentId: { type: mongoose.Schema.Types.ObjectID, ref: 'COMMENT' },
    replyUserId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'USERS' // 关联的模型名称  
    },
    replyToreplyUserId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'USERS' // 关联的模型名称  
    },
    replyText: String,
    replyImages: String,
    replyLike: Number,
    replyComment: Number,
})

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
})
const LIKE = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectID, required: true, ref: 'USERS' },
    targetType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectID, required: true },
})

const STATICDATA = new mongoose.Schema({
    staticType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectID, required: true },
    staticUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectID, required: true, ref: 'USERS' },
})
const MENTION = new mongoose.Schema({
    /* 全部根据用户的id查选 */
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'POST' },//post ID
    bymentionUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//被@的用户的id/而这才是自己的id//根据这个ID进行查询
    mentionedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//用户id
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, },//类型的id
    targetType: { type: String, required: true },//类型
    targetText: { type: String, required: true },//被提及的内容
    createdAt: { type: Date, default: Date.now },//创建的时间
    read: { type: Boolean, default: false }//是否读取
});
const verificationCode = new mongoose.Schema({
    verificationCode: { type: String, required: true },//验证码
    creadfailureTime: { type: Date, default: Date.now },//创建的时间
});
verificationCode.index({ creadfailureTime: { expires: 5 * 60 } });// 创建一个过期索引，在5分钟后自动删除文档
const POSTS = mongoose.model('POSTS', POST)
const COMMENTS = mongoose.model('COMMENTS', COMMENT)
const REPLYS = mongoose.model('REPLYS', REPLY)
const USERS = mongoose.model('USERS', USER)
const LIKES = mongoose.model('LIKES', LIKE)
const STATICDATAS = mongoose.model('STATICDATAS', STATICDATA)
const MENTIONS = mongoose.model('MENTIONS', MENTION)
const verificationCodes = mongoose.model('verificationCodes', verificationCode)

// 监听客户端连接,uniapp error
io.on('connection', async (socket) => {
    const sendUserID = socket.handshake.query.userid
    socket.on(`newMessage`, async (data) => {
        const datas = await MENTIONS.aggregate([
            {
                $match: {
                    targetType: 'reply',
                    bymentionUserId: new ObjectID(`${data.userid}`),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bymentionUserId',
                    foreignField: '_id',
                    as: 'bymentionUser'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'mentionedUserId',
                    foreignField: '_id',
                    as: 'mentionedUserId'
                }
            },
            {
                $project: {
                    'bymentionUser.password': 0,
                    'mentionedUserId.password': 0,
                }
            }
        ]);
        io.emit(`${data.userid}`, { datas });
    })
});
//auth API
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = req.headers.token;
    }
    if (!token) {
        return res.status(401).json({ meassge: 'Unauthorized: Missing token' })
    }
    try {
        const decoded = jwt.verify(token, 'hello world')
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

app.use(express.static('upload'))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json())
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body.data
        const user = await USERS.findOne({ username })
        if (!user) {
            return res.status(400).json({ meassge: '账号或者密码错误' })
        }
        const passworMatch = await bcrypt.hash(password, user.password)
        if (!(passworMatch === user.password)) {
            return res.status(401).json({ meassge: '账号或者密码错误' })
        }
        const token = jwt.sign({ userid: user._id }, 'hello world', { expiresIn: '30d' })
        res.status(200).json({ jwt: token, userid: user._id, username: username, headimg: user.headimg })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// send this coe for Register
app.post('/nodemailerRegister', async (req, res) => {
    try {
        const { username, password, email } = req.body.data;
        const user = await USERS.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ meassge: '账号或邮件已经存在' })
        }
        /* 生产五位数的验证码的函数
        *  五位数的验证码
        */
        function generateVerificationCode() {
            const min = 10000;
            const max = 99999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const code = generateVerificationCode()
        const verificationCode = new verificationCodes({
            verificationCode: code,
        });
        await verificationCode.save()
        /*
        * 发送确认邮件的函数
        * 创建一个Nodemailer传输器
        *  
        */
        const transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 587,
            secure: false,
            auth: {
                user: "2890901420@qq.com", // 你的邮箱地址
                pass: 'ksbyznjdtmhjdghh'// 你的邮箱密码
            }
        });
        const mailOptions = {
            from: '2890901420@qq.com',
            to: `${email}`,
            subject: 'Verification Code for Registration',
            text: `Your verification code is: ${code}. Please use this code to complete your registration process.`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });
        res.status(201).json({
            message: `您的验证码已经到达邮件,注意5分钟后过期`,
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, code } = req.body.data
        const userAndemail = await USERS.findOne({ $or: [{ username }, { email }] });//false
        const user = await verificationCodes.findOne({ verificationCode: code });//true
        if (!(userAndemail || user)) {
            return res.status(400).json({ meassge: '验证码错误', status: false })
        }
        await verificationCodes.deleteOne({ verificationCode: code })
        const hashpassword = await bcrypt.hash(password, 10)
        const userdata = new USERS({
            username,
            password: hashpassword,
            email,
        })
        await userdata.save()
        res.status(201).json({ status: true })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
//this is get the post API
app.get('/post', async (req, res) => {
    try {
        //
        const allPost = await POSTS.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'postUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    user: '$user'
                }
            },
            {
                $lookup: {
                    from: 'likes',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postImages: 1,
                    postText: 1,
                    postShare: 1,
                    postFavorite:1,
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    /* 'postImages.staticUrl': 1, */
                    postUserId: 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        const data = await POSTS.find()
        // random array algo
        function shuffleArray(data) {
            for (let i = data.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1))
                [data[i], data[j]] = [data[j], data[i]];
            }
            return data
        }
        const randomData = shuffleArray(allPost);
        res.status(200).send(randomData)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})
//this a filter post API
app.post('/fliterpsot', async (req, res) => {
    try {
        const filtertarget = req.body.data.postText
        const result = await POSTS.aggregate([
            {
                $match: {
                    postText: {
                        $regex: filtertarget,
                        $options: 'i'
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'likes',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'staticdatas',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'postImages'
                }
            },
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postText: 1,
                    postUserId: 1,
                    postFavorite:1,
                    postShare: 1,
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    'postImages.staticUrl': 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ meassge: error.meassge })
    }
})
//get all comments API
app.get('/comment/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await COMMENTS.aggregate([
            {
                $match: {
                    postId: new ObjectID(`${_id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'commentUserId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $project: {
                    _id: 1,
                    commentText: 1,
                    postId: 1,
                    commentLike: { $size: '$likes' },
                    commentImages: 1,
                    /* 'postImages.staticUrl': 1, */
                    'users.username': 1,
                    'users.headimg': 1,
                    'users._id': 1

                }
            }
        ])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// this is an api for getAll  reply APi
/* 子评论回复子评论
* 采用二叉树（完美二叉树）或者堆(感觉应该用n叉树，-对多的数据结构)
* comment is root node and reply is left or right node ，replyToreply is leaf node in the end 。
* --------
* 暂时设置二级子评论
*/
app.get('/allreply/:id', async (req, res) => {
    try {
        const commentId = req.params.id;

        // 确保 commentId 是一个合法的 ObjectId
        let objectId;
        try {
            objectId = new ObjectId(commentId);
        } catch (error) {
            return res.status(400).json({ message: 'Invalid commentId' });
        }

        const finddata = await REPLYS.aggregate([
            {
                $match: {
                    commentId: objectId
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'replyUserId',
                    foreignField: '_id',
                    as: 'replyUser'
                }
            },
            {
                $unwind: '$replyUser'
            },
            {
                $lookup: {
                    from: 'users',
                    let: { replyToId: '$replyToreplyUserId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ['$$replyToId', null] },
                                        { $ne: ['$$replyToId', ''] },
                                        { $eq: ['$_id', '$$replyToId'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'replyToreplyUser'
                }
            },
            {
                $addFields: {
                    replyToreplyUser: {
                        $cond: {
                            if: { $eq: [{ $size: '$replyToreplyUser' }, 0] },
                            then: [{}],
                            else: { $arrayElemAt: ['$replyToreplyUser', 0] }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $addFields: {
                    replyLike: { $size: '$likes' }
                }
            },
            {
                $project: {
                    'likes': 0,
                    'replyUser.password': 0,
                    'replyUser._id': 0,
                    'replyToreplyUser.password': 0,
                    'replyToreplyUser._id': 0
                }
            }
        ])

        res.status(200).send(finddata);
    } catch (error) {
        console.error('Error:', error); // 打印错误信息
        res.status(500).json({ message: error.message });
    }
});
app.use(authMiddleware)
app.get('/getusepost/:id', async (req, res) => {
    try {
        const useId = req.params.id;
        const useByPost = await POSTS.aggregate([
            {
                $match: {
                    postUserId: new ObjectID(`${useId}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    user: '$user'
                }
            },
            {
                $lookup: {
                    from: 'likes',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'staticdatas',
                    let: { targetIdVar: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$targetId", "$$targetIdVar"] }, // 通过 _id 进行关联
                                        { $eq: ["$staticType", "post"] }, // 价格低于100的产品

                                    ],
                                }
                            }
                        }
                    ],
                    as: 'postImages'
                }
            },
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postText: 1,
                    postShare: 1,
                    postUserId: 1,
                    postFavorite:1,
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    'postImages.staticUrl': 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        res.status(200).send(useByPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//根据用户id查询相对应的comment，返回给用户信息进行展示
app.get('/getusecomment/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await COMMENTS.aggregate([
            {
                $match: {
                    commentUserId: new ObjectID(`${_id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'commentUserId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $project: {
                    _id: 1,
                    commentText: 1,
                    commentLike: { $size: '$likes' },
                    commentImages: 1,
                    postId: 1,
                    /* 'postImages.staticUrl': 1, */
                    'users.username': 1,
                    'users._id': 1,
                    'users.headimg': 1
                }
            }
        ])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//根据用户id查询相对应的reply，返回给用户信息进行展示
app.get('/getusereply/:id', async (req, res) => {
    try {
        const userId = req.params.id
        /*         { 'commentId': { $eq: new ObjectID(`${commentId}`) } } */
        const finddata = await REPLYS.aggregate(
            [
                {
                    $match: {
                        replyUserId: new ObjectID(`${userId}`)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyUserId',
                        foreignField: '_id',
                        as: 'replyUser'
                    }
                },
                {
                    $unwind: '$replyUser'
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyToreplyUserId',
                        foreignField: '_id',
                        as: 'replyToreplyUser'
                    }
                },
                {
                    $unwind: {
                        path: '$replyToreplyUser',
                        preserveNullAndEmptyArrays: true // 保留空数组以处理可选字段
                    }
                },
                {
                    $lookup: {
                        from: 'likes',
                        localField: '_id',
                        foreignField: 'targetId',
                        as: 'likes'
                    }
                },
                {
                    $addFields: {
                        replyLike: { $size: '$likes' },
                    }
                },
                {
                    $project: {
                        'likes': 0,
                        'replyUser.password': 0,
                        'replyUser._id': 0,
                        'replyToreplyUser.password': 0,
                        'replyToreplyUser._id': 0,
                    }
                }
            ]
        )
        res.status(200).send(finddata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is find one the post API
app.get('/findonepost/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await POSTS.aggregate([
            {
                $match: {
                    _id: new ObjectID(`${_id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $addFields: {
                    user: '$user'
                }
            },
            {
                $lookup: {
                    from: 'likes',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'staticdatas',
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'postImages'
                }
            },
            {
                $project: {
                    _id: 1,
                    /* postUserImage: 1,
                    postUserName: 1, */
                    postText: 1,
                    postUserId: 1,
                    postShare: 1,
                    postLike: { $size: '$likes' },
                    postComment: { $size: '$comments' },
                    'postImages.staticUrl': 1,
                    'user.username': 1,
                    'user.headimg': 1
                }
            }
        ])
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is addition the post API
app.post('/addpost', async (req, res) => {
    // const { UserImage, UserName, Image, Text, Share, Like, Comment } = req.body.data
    const { UserId, Image, Text, Share, Like, Comment } = req.body.data
    console.log(Image)
    const data = new POSTS({
        // postUserImage: UserImage,
        // postUserName: UserName,
        postUserId: UserId,
        postText: Text,
        postImages: Image,
        postShare: Share,
        postLike: Like,
        postComment: Comment,
    })
    try {
        const datatosave = await data.save()
        res.status(200).send(datatosave)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is delete the post API
app.delete('/delpost/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const delPost = await POSTS.findByIdAndDelete({ _id: postId })
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
})
//this is updata the post API
app.patch('/uppost/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const { UserImage, UserName, Image, Text, Share, Like, Comment } = req.body.data
        const data = await POSTS.findOneAndUpdate({ _id: postId }, {
            postUserImage: UserImage,
            postUserName: UserName,
            postText: Text,
            postImages: Image,
            postShare: Share,
            postLike: Like,
            postComment: Comment,
        }, { new: true })
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//this is an api for add comments 
app.post('/addcomment/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const { commentUserId, Text, Image, Like } = req.body.data
        const data = new COMMENTS({
            postId: new ObjectID(`${_id}`),
            commentUserId: commentUserId,
            commentText: Text,
            commentImages: Image,
            commentLike: Like,
        })
        const datatosave = await data.save()
        res.status(200).send(datatosave)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is an api for deleting comments API
app.delete('/delcomment/:id', async (req, res) => {
    try {
        const commentId = req.params.id
        const delComment = await COMMENTS.findByIdAndDelete(commentId)
        res.status(200).send(delComment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
/* 
comment API is not updata and  it that late
*/
/* 
below is reply API
*/
//this is an api for add reply API
app.post('/addreply', async (req, res) => {
    try {
        const {
            postId,//文章id
            commentId,
            replyUserId,
            replyToreplyUserId,
            replyText,
            replyImages,
            replyLike,
            replyComment
        } = req.body.data
        const data = new REPLYS({
            postId: new ObjectID(`${postId}`),
            commentId: new ObjectID(`${commentId}`),
            replyToreplyUserId: replyToreplyUserId,
            replyUserId: replyUserId,
            replyText: replyText,
            replyImages: replyImages,
            replyLike: replyLike,
            replyComment: replyComment
        })
        const datatosave = await data.save()
        // 保存数据做消息推送
        if (replyToreplyUserId) {
            const mention = new MENTIONS({
                postId,
                bymentionUserId: replyToreplyUserId,
                mentionedUserId: replyUserId,
                targetText: replyText,
                targetId: datatosave._id,
                targetType: 'reply',
                createdAt: new Date(),
                read: false
            });
            await mention.save();
        }
        res.status(200).send(datatosave)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//this is an api for delete reply API
app.delete('/delreply/:id', async (req, res) => {
    try {
        const replyId = req.params.id
        const delReply = await REPLYS.findByIdAndDelete(replyId)
        res.status(200).send(delReply)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
/*  likeAPI函数
      参数1：路径
      参数2：类型
      返回值：点赞api
  */
const likeRouter = function (url, targetType) {
    const url_value = url;
    const targetType_value = targetType;
    app.post(url_value, async (req, res) => {
        try {
            const commentId = req.params.id;
            const userId = req.body.data.userId;
            const existingLike = await LIKES.findOne({
                userId: new mongoose.Types.ObjectId(userId),
                targetType: targetType_value,
                targetId: new mongoose.Types.ObjectId(commentId)
            });
            if (existingLike) {
                const likes = await LIKES.find({ targetType: targetType_value, targetId: new mongoose.Types.ObjectId(commentId) });
                return res.status(400).json({ message: '已经点赞了，不能重复点赞', likenum: likes.length });
            } else {
                const newLike = new LIKES({
                    userId: new mongoose.Types.ObjectId(userId),
                    targetType: targetType_value,
                    targetId: new mongoose.Types.ObjectId(commentId)
                });
                await newLike.save();
                const likes = await LIKES.find({ targetType: targetType_value, targetId: new mongoose.Types.ObjectId(commentId) });
                res.status(201).json({ newLike, likenum: likes.length });
            }

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
//点赞post
likeRouter('/post/like/:id', 'post');
// 点赞评论
likeRouter('/comments/like/:id', 'comment');
// 点赞回复
likeRouter('/replies/like/:id', 'reply');

//delete like button
app.delete('/dellike/:id', async (req, res) => {
    try {
        const likeid = req.params.id
        const deledata = await LIKES.findByIdAndDelete(likeid)
        res.status(200).send(deledata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//upload API
app.post('/upload/:id', upload, async (req, res) => {
    try {
        const { targetId, staticType } = Object.assign({}, req.body)
        const userid = req.params.id
        const uuid = crypto.randomUUID()
        const filepath = uuid + "_" + (req.file.originalname)
        fs.renameSync(req.file.path, `upload/${filepath}`);
        const data = new STATICDATAS({
            staticType: staticType,
            targetId: new mongoose.Types.ObjectId(targetId),
            staticUrl: `http://127.0.0.1:4000/${filepath}`,
            userId: new mongoose.Types.ObjectId(userid)
        }
        )
        const datatosave = await data.save();
        res.status(200).send(datatosave)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

app.get('/notifications/:userid', async (req, res) => {
    try {
        const userid = req.params.userid
        /* 被提及的才是自己的id */
        const data = await MENTIONS.aggregate([
            {
                $match: {
                    targetType: 'reply',
                    bymentionUserId: new ObjectID(`${userid}`),
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'bymentionUserId',
                    foreignField: '_id',
                    as: 'bymentionUserId'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'mentionedUserId',
                    foreignField: '_id',
                    as: 'mentionedUserId'
                }
            },
            {
                $project: {
                    'bymentionUser.password': 0,
                    'mentionedUserId.password': 0,
                }
            }
        ]);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

app.post('/readnotifications/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await MENTIONS.findOneAndUpdate(
            { _id: id },
            { read: true },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})
app.delete('/delnotifications/:id', async (req, res) => {
    try {
        const Id = req.params.id
        const delPost = await MENTIONS.findByIdAndDelete({ _id: Id })
        res.status(200).send(delPost)
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
})
server.listen(PORT, () => {
    console.log(
        'server is open'
    )
})