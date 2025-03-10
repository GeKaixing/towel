import { USERS, STATICDATAS} from '../models/index.js'
import fs from 'fs'
import mongoose from 'mongoose'

// 上传文件
export const uploadApi=async (req, res) => {
    try { 
          const { targetId, staticType } = Object.assign({}, req.body)
          const userid = req.params.id
          const uuid = crypto.randomUUID()
          const filepath = uuid + "_" + (req.file.originalname)
          fs.renameSync(req.file.path, `upload/${filepath}`);
          if (!mongoose.Types.ObjectId.isValid(targetId)) {
            throw new Error('targetId 不是有效的 24 位十六进制字符串');
        }
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            throw new Error('userid 不是有效的 24 位十六进制字符串');
        }
          const data =  new STATICDATAS({
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
  }

// 上传视频
export const uploadvideoApi=async (req, res) => {
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
}

//上传用户头像
export const uploadheadimgApi=async (req, res) => {
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
}