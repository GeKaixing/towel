import { auth } from "../config";
//请求用户发布的帖子
export const getUsePost=(id)=>{
    return auth({url:`getusepost/${id}`,method:'get'})
}
//请求用户发布的评论
export const getUseComment=(id)=>{
    return auth({url:`getusecomment/${id}`,method:'get'})
}
//请求用户发布的回复
export const getUseReply=(id)=>{
    return auth({url:`getusereply/${id}`,method:'get'})
}