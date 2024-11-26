import nodemailer from 'nodemailer'
import {USERS,verificationCodes} from '../models/index.js'
import redisClient from '../redis/index.js'
// 获取用户信息
export const userinfoApi =async (req, res) => {
    try {
        const id = req.params.id
        const data = await USERS.findOne({ _id: id }, { password: 0 })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// 注销账号验证码
export const deactivatecodeApi = async (req, res) => {
    try {
        const { username, email } = req.body.data;
        const user = await USERS.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(400).json({ meassge: '账号或邮件未存在' })
        }
         // 检查 Redis 是否已有未过期验证码
        const rideskey=`deactivate:${email}`
        const existingCode = await redisClient.get(redisKey);
        if (existingCode) {
            return res.status(200).json({
                message: `您的验证码已发送，请稍后再试`,
            });
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
         // 存储验证码到 Redis，设置 5 分钟过期
         await redisClient.set(redisKey, code, { EX: 300 });

        /* const verificationCode = new verificationCodes({
            verificationCode: code,
        }); */
       /*  await verificationCode.save() */
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
}

// 注销账号 API
export const deactivateaccountAPi = async (req, res) => {
    try {
        const { username, email, code, password } = req.body.data;

        // 查询用户信息
        const user = await USERS.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ message: '用户不存在', status: false });
        }

        // 验证密码
        if (user.password !== password) {
            return res.status(401).json({ message: '密码错误', status: false });
        }

        // 验证验证码 (从 Redis 中获取)
        const redisKey = `deactivate:${email}`;
        const storedCode = await redisClient.get(redisKey);

        if (!storedCode || storedCode !== code) {
            return res.status(400).json({ message: '验证码错误或已过期', status: false });
        }

        // 删除用户
        await USERS.deleteOne({ email });
        await redisClient.del(redisKey); // 删除 Redis 中的验证码

        res.status(200).json({ message: '账号已成功注销', status: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: '服务器错误，请稍后再试', status: false });
    }
};
// 修改用户名
export const modifyingausernameAPi= async (req, res) => {
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
}
// 修改手机号
export const modifyingiphoneNumberApi= async (req, res) => {
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
}
// 修改生日
export const modifyingbirthdayApi=async (req, res) => {
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
}