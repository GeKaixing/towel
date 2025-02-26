import multer from 'multer'
import express from 'express'

import { uploadApi, uploadheadimgApi, uploadvideoApi } from '../../controllers/upload.js';


const router = express.Router();
const upload = multer({ dest: 'upload' }).single('file')
const uploadVideo = multer({ dest: 'uploadvideo' }).single('video')
const uploadHeadImg = multer({ dest: 'uploadheadimg' }).single('headimg')


// 上传文件
router.post('/upload/:id', upload, uploadApi)
// 上传视频
router.post('/uploadvideo/:id', uploadVideo, uploadvideoApi)
//上传用户头像
router.post('/uploadheadimg/:id', uploadHeadImg, uploadheadimgApi)

export default router;