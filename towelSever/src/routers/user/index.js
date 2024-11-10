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
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes } = require('../../models/index');
router.get('/userinfo/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await USERS.findOne({ _id: id }, { password: 0 })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
)

// 注销账号验证码
router.post('/deactivatecode', async (req, res) => {
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
            text: `您的验证码: ${code}.注意注销账号不可逆`
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
router.post('/deactivateaccount', async (req, res) => {
    try {
        const { username, email, code, password } = req.body.data
        const userAndemail = await USERS.findOne({ $or: [{ username }, { email }, { password }] });//false
        const user = await verificationCodes.findOne({ verificationCode: code });//true
        if (!(userAndemail || user)) {
            return res.status(400).json({ meassge: '验证码错误', status: false })
        }
        await USERS.deleteOne({ email: email })
        res.status(201).json({ status: true })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/modifyingausername', async (req, res) => {
    try {
        const { newusername, id } = req.body.data
        const userAndemail = await USERS.findOne({ username:newusername });//false
        if (userAndemail) { return res.status(400).json({ meassge: '用户名重复哦', status: false }) }
        const data = await USERS.findOneAndUpdate(
            { _id: id },
            { username: newusername },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/modifyingiphoneNumber', async (req, res) => {
    try {
        const { phoneNumber, id } = req.body.data
        const userAndemail = await USERS.findOne({ _id:id });//false
        if (!userAndemail) { return res.status(400).json({ meassge: '找不到账号', status: false }) }
        const data = await USERS.findOneAndUpdate(
            { _id: id },
            { phoneNumber: phoneNumber },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/modifyingbirthday', async (req, res) => {
    try {
        const { birthday, id } = req.body.data
        const userAndemail = await USERS.findOne({ _id:id });//false
        if (!userAndemail) { return res.status(400).json({ meassge: '找不到账号', status: false }) }
        const data = await USERS.findOneAndUpdate(
            { _id: id },
            { birthday: birthday },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
module.exports = router;