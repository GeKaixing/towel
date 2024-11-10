import express from "express";
import { allcommentadminApi, allpostadminApi, allreplyadminApi, 
    alluserAPi, banuserApi, delcommentadminApi, deleteuserApi,
     delpostadminApi, delreplyadminApi, offbanuserApi, offsealinguserApi, 
     sealinguserApi, updatacontextpostadminApi, updatatitlepostadminApi } from "../../controllers/admin.js";

const router = express.Router();


// 获取所有用户
router.get("/alluser",alluserAPi);

// 封禁用户
router.post("/banuser/:id", banuserApi);

// 关闭封禁
router.post("/offbanuser/:id", offbanuserApi);

// sealing用户
router.post("/sealinguser/:id", sealinguserApi);

// 关闭sealing用户
router.post("/offsealinguser/:id",offsealinguserApi);

// 删除用户
router.delete("/deleteuser/:id",deleteuserApi );

// 获取所有文章
router.get("/allpostadmin", allpostadminApi);

// 删除帖子
router.delete("/delpostadmin/:id",delpostadminApi );

// 修改帖子标题
router.post("/updatatitlepostadmin/:id",updatatitlepostadminApi );

// 更新文章内容
router.post("/updatacontextpostadmin/:id",updatacontextpostadminApi );

// 获取所有评论
router.get("/allcommentadmin",allcommentadminApi );

// 删除评论
router.delete("/delcommentadmin/:id",delcommentadminApi);

// 获取所有回复
router.get("/allreplyadmin", allreplyadminApi);

// 删除回复
router.delete("/delreplyadmin/:id", delreplyadminApi);
export default router;
