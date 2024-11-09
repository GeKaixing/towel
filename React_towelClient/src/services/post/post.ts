import { open, auth } from '../config.ts';
//获取 文章
export const getPost = (url='post') => {
   return open({ url:url })}
// 点赞文章
export const postPostLike = (id, data) => {
   return auth({ url: `post/like/${id}`, data })
}
//收藏文章
export const postPostfavorite = (id, data) => {
   return auth({ url: `post/favorite/${id}`, data })
}
//删除文章
export const deletePost = (id) => {
   return auth({ url: `delpost/${id}`, method: 'delete' })
}
//添加评论
export const postAddPostComment = (id, data) => {
   return auth({ url: `addcomment/${id}`, data })
}
//添加回复
export const postAddPostReply = (data) => {
   return auth({ url: `addreply`, data })
}
//查询评论
export const getComment = (id) => {
   return open({ url: `comment/${id}` })
}
//删除评论
export const postDelComment = (id) => {
   return auth({ url: `delcomment/${id}`, method: 'delete' })
}
//查询一个文章
export const getOnePost = (id) => {
   return auth({ url: `findonepost/${id}`,method:'get' })
}
//点赞评论
export const postCommentsLike = (id, data) => {
   return auth({ url: `comments/like/${id}`, data })
}
//查询回复
export const getAllreply = (id) => {
   return open({ url: `allreply/${id}` })
}
//删除回复
export const postDelReply = (id) => {
   return auth({ url: `delreply/${id}`, method: 'delete' })
}