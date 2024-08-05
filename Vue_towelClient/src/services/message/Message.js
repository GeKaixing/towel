import { auth } from "../config";
//查询消息
export const getNotifications=(id)=>{
    return auth({url:`notifications/${id}`,method:'get'})
}
//
export const postReadnotifications=(id)=>{
    return auth({url:`readnotifications/${id}`,method:'post'})
}
//
export const deleteNotifications=(id)=>{
    return auth({url:`delnotifications/${id}`,method:'delete'})
}