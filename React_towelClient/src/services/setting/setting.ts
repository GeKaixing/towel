import { open,auth } from "../config";
//查询bing每日壁纸
export const getHPImageArchive = () => {
    return open({ url: 'HPImageArchive' })
}
export const getUserinfo = (id) => {
    return auth({ url: `userinfo/${id}`,method:'get'})
}
//修改用户名
export const postModifyingausername = (data) => {
    return auth({ url: `modifyingausername`,data })
}
//修改电话
export const postModifyingiphoneNumber = (data) => {
    return auth({ url: `modifyingiphoneNumber`,data })
}
//修改生日
export const postModifyingbirthday = (data) => {
    return auth({ url: `modifyingbirthday`,data })
}
//购买vip
export const postPremium = (data) => {
    return auth({ url: `premium`,data })
}
