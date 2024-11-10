import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import http from 'http'
import multer from 'multer'
import fs from 'fs'
import {Server} from 'socket.io'
import socketio from './src/socket/index.js'
import authMiddleware from './src/routers/auth/index.js'
import commonRoute from './src/routers/common/index.js';
import AI from './src/routers/Ai/Llama.js';
import admin from './src/routers/admin/index.js';
import toutiaoHot from './src/routers/toutiaoHot/index.js';
import authRoute from './src/routers/auth/index.js';
import userRoute from './src/routers/user/index.js';
import { USERS, STATICDATAS,} from './src/models/index.js'
import bing from './src/routers/bing/index.js'

const app = express()
const PORT = 4000;
const upload = multer({ dest: 'upload' }).single('file', 'text')
const uploadVideo = multer({ dest: 'uploadvideo' }).single('video', 'text')
const uploadHeadImg = multer({ dest: 'uploadheadimg' }).single('headimg', 'text')
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });


app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'))
app.use(express.static('uploadvideo'))
app.use(express.static('uploadheadimg'))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017').catch(error => handleError(error))
mongoose.connection.on('error', error => { console.log(error); })
mongoose.connection.once('connected', () => {
    console.log('mongodb is connected');
})


// 监听客户端连接
socketio(io)
// common API
app.use(bing)
//admin
app.use(admin)
//ai
app.use(AI)
//toutiaoHot
app.use(toutiaoHot)
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
app.post('/uploadvideo/:id', uploadVideo, async (req, res) => {
    try {
        const { targetId, staticType } = Object.assign({}, req.body)
        const userid = req.params.id
        const uuid = crypto.randomUUID()
        const filepath = uuid + "_" + (req.file.originalname)
        fs.renameSync(req.file.path, `uploadvideo/${filepath}`);
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
app.post('/uploadheadimg/:id', uploadHeadImg, async (req, res) => {
    try {
        const { targetId, staticType } = Object.assign({}, req.body)
        const userid = req.params.id
        const userAndemail = await USERS.findOne({ _id: userid });//false
        if (!userAndemail) { return res.status(400).json({ meassge: '找不到账号', status: false }) }
        const uuid = crypto.randomUUID()
        const filepath = uuid + "_" + (req.file.originalname)
        fs.renameSync(req.file.path, `uploadheadimg/${filepath}`);
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