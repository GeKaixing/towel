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
const server = http.createServer(app);
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173']}))
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json())
const PORT = 4000;
mongoose.connect('mongodb://localhost:27017').catch(error => handleError(error))
mongoose.connection.on('error', error => { console.log(error); })
mongoose.connection.once('connected', () => {
    console.log('mongodb is connected');
})
const { POSTS,
    COMMENTS,
    REPLYS,
    USERS,
    LIKES,
    FAVORITES,
    STATICDATAS,
    MENTIONS,
    verificationCodes } = require('./src/DB/index');
// 监听客户端连接
const socketio = require('./src/socket/index');
socketio(io)
const authMiddleware = require('./src/auth/index')
const commonRoute = require('./src/commonRoute/index')
const AI = require('./src/Ai/Llama')
const authRoute = require('./src/authRoute/index')
const userRoute = require('./src/authRoute/userRoute/userRouter')
// common API
const axios = require('axios');
app.get('/HPImageArchive', async (req, res) => {
    try {
        const response = await axios.get('https://cn.bing.com/HPImageArchive.aspx', {
            params: {
                format: 'js',
                idx: 0,
                n: 1,
                nc: 1586183781119,
                pid: 'hp',
                uhd: 1,
                uhdwidth: 2880,
                uhdheight: 1620
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});
//ai
app.use(AI)
//open api
app.use(commonRoute)
//auth API
app.use(authMiddleware)
////auth API
app.use(authRoute)
app.use(userRoute)
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
//上传用户头像
app.post('/uploadHeadImg/:id', upload, async (req, res) => {
    try {
        const { targetId, staticType } = Object.assign({}, req.body)
        const userid = req.params.id
       
        const userAndemail = await USERS.findOne({ _id: userid });//false
        if (!userAndemail) { return res.status(400).json({ meassge: '找不到账号', status: false }) }

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
        await data.save();
        const datas = await USERS.findOneAndUpdate(
            { _id: userid },
            { headimg: `http://127.0.0.1:4000/${filepath}` },
            { new: true, useFindAndModify: false } // 确保返回更新后的文档，并使用新的 findOneAndUpdate 行为
        );
        res.status(200).send(datas.headimg)
    } catch (error) {
        res.status(500).json({ massage: error.massage })
    }
})

server.listen(PORT, () => {
    console.log(
        'server is open'
    )
})