const router = require('express').Router();
const ObjectID = require('mongodb').ObjectId;
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {
    POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    verificationCodes } = require('../DB/index');
router.post('/login', async (req, res) => {
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
router.post('/nodemailerRegister', async (req, res) => {
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
// send this coe for Register
router.post('/forgetpasswordverificationcode', async (req, res) => {
    try {
        const { username, email } = req.body.data;
        const user = await USERS.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(400).json({ meassge: '账号或邮件未存在' })
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
            subject: 'forget password code',
            text: `您的验证码: ${code}.`
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
router.post('/forgetpassword', async (req, res) => {
    try {
        const { username, email, code, password } = req.body.data
        const userAndemail = await USERS.findOne({ $or: [{ username }, { email }] });//false
        const user = await verificationCodes.findOne({ verificationCode: code });//true
        if (!(userAndemail || user)) {
            return res.status(400).json({ meassge: '验证码错误', status: false })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const data = await USERS.findOneAndUpdate({ email: email }, {
            username,
            password: hashpassword,
            email,
        }, { new: true })
        res.status(201).json({ data, status: true })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/register', async (req, res) => {
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
router.get('/post', async (req, res) => {
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
                    from: 'favorites',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'favorites'
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
                    postVideos: 1,
                    postText: 1,
                    postShare: 1,
                    postFavorite: { $size: '$favorites' },
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
router.post('/fliterpsot', async (req, res) => {
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
                $unwind: {
                    path: '$user',
                }
            },
            {
                $lookup: {
                    from: 'favorites',//这里要填mongoose compass的集合的名字
                    localField: '_id',
                    foreignField: 'targetId',
                    as: 'favorites'
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
                    postVideos: 1,
                    postUserId: 1,
                    postFavorite: { $size: '$favorites' },
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
router.get('/comment/:id', async (req, res) => {
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
router.get('/allreply/:id', async (req, res) => {
    try {
        const commentId = req.params.id;

        // 确保 commentId 是一个合法的 ObjectId
        let objectId;
        try {
            objectId = new ObjectID(commentId);
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
module.exports = router;  