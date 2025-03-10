import express from 'express';
import { addcommentApi, addpostApi,
   addreplyApi, delcommentApi, delpostApi, delreplyApi, 
   findonepostApi, getusecommentApi, getusepostApi, 
   getusereplyApi, postfavoriteApi, dellikeApi, 
   notificationsApi, readnotificationsApi, delnotificationsApi, uppostApi, 
   postlikeApi,
   commentlikeApi,
   replylikeApi} from '../../controllers/auth.js';

const router = express.Router();

//根据用户id查询相对应的post，返回给用户信息进行展示
router.get('/getusepost/:id', getusepostApi)
//根据用户id查询相对应的comment，返回给用户信息进行展示
router.get('/getusecomment/:id', getusecommentApi)
//根据用户id查询相对应的reply，返回给用户信息进行展示
router.get('/getusereply/:id', getusereplyApi)
//this is find one the post API
//根据id查询一个post
router.get('/findonepost/:id', findonepostApi)
//this is addition the post API
// 新增post
router.post('/addpost', addpostApi)
//this is delete the post API
router.delete('/delpost/:id', delpostApi)
//this is updata the post API
// 删除post
router.patch('/uppost/:id',uppostApi)
//this is an api for add comments 
// 新增comment
router.post('/addcomment/:id', addcommentApi)
//this is an api for deleting comments API
// 删除comment
router.delete('/delcomment/:id', delcommentApi)
//this is an api for add reply API
router.post('/addreply', addreplyApi)
//this is an api for delete reply API
// 新增reply
router.delete('/delreply/:id', delreplyApi)
/*  likeAPI函数
      参数1：路径
      参数2：类型
      返回值：点赞api
  */
//点赞post API
router.post( '/post/like/:id',postlikeApi)
// 点赞评论 API
router.post( '/comments/like/:id',commentlikeApi)
// 点赞回复 API
router.post( '/replies/like/:id',replylikeApi)
//收藏post API
router.post('/post/favorite/:id', postfavoriteApi);
//delete like button
// 删除点赞
router.delete('/dellike/:id', dellikeApi)
// 获取通知
router.get('/notifications/:userid', notificationsApi)
// 读取通知
router.post('/readnotifications/:id', readnotificationsApi)
// 删除通知
router.delete('/delnotifications/:id', delnotificationsApi)
export default  router;