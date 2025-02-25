import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import {Server} from 'socket.io'
import socketio from './src/socket/index.js'
import authMiddleware from './src/routers/auth/index.js'
import common from './src/routers/common/index.js';
import AI from './src/routers/Ai/Llama.js';
import toutiaoHot from './src/routers/toutiaoHot/index.js';
import auth from './src/routers/auth/index.js';
import user from './src/routers/user/index.js';
import bing from './src/routers/bing/index.js'
import stripe from './src/routers/stripe/index.js'
import upload from './src/routers/upload/index.js'
import './src/models/index.js'
import redisClient from './src/redis/index.js'
import 'dotenv/config'

const app = express()

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

// 使用 raw body 解析器来处理 Stripe Webhook 请求
// app.use(bodyParser.raw({ type: 'application/json' }));
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'))
app.use(express.static('uploadvideo'))
app.use(express.static('uploadheadimg'))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json())

// 监听客户端连接
socketio(io)
// bing API
app.use(bing)
//ai API
app.use(AI)
//toutiaoHot API
app.use(toutiaoHot)
//open api
app.use(common)
//auth API 上面的可以不适用jwt
app.use(authMiddleware)
//auth API
app.use(auth)
//stripe API
app.use(stripe)
//user API
app.use(user)
//upload API
app.use(upload)
//启动服务器
server.listen(4000, () => {
    console.log(
        'server 开启成功端口:4000'
    )
})