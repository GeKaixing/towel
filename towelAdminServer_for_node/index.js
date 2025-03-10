import express from 'express'
import { connect } from './src/models/index.js';
import admin from './src/routers/admin/index.js'
const app = express();
connect()
app.use(admin)
app.listen(4004,()=>{
    console.log('后台管理服务启动成功')    
})