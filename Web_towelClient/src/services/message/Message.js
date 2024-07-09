import { auth } from "../config";
//查询消息
export const getNotifications=()=>{
    return auth({url:'notifications',method:'get'})
}
//
export const postReadnotifications=(id)=>{
    return auth({url:`readnotifications/${id}`,method:'post'})
}
//
export const deleteNotifications=(id)=>{
    return auth({url:`delnotifications/${id}`,method:'delete'})
}