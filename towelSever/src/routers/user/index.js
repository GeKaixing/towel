import express  from 'express'

const router = express.Router();

import  { userinfoApi, deactivatecodeApi, 
    deactivateaccountAPi, modifyingausernameAPi, 
    modifyingiphoneNumberApi, modifyingbirthdayApi } from '../../controllers/user.js';


// 获取用户信息
router.get('/userinfo/:id', userinfoApi)
// 注销账号验证码
router.post('/deactivatecode',deactivatecodeApi)
// 注销账号
router.post('/deactivateaccount',deactivateaccountAPi);
// 修改用户名
router.post('/modifyingausername',modifyingausernameAPi);
// 修改手机号
router.post('/modifyingiphoneNumber', modifyingiphoneNumberApi);
// 修改生日
router.post('/modifyingbirthday',modifyingbirthdayApi );

export default  router;