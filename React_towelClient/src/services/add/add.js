
import { auth } from '../config';
//上传图片
export const postUpLoad = (id, data) => {
    return auth({
        url: `upload/${id}`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
//上传视频
export const postUpLoadVideo = (id, data) => {
    return auth({
        url: `uploadvideo/${id}`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}
//添加帖子
export const postAddPost = (data) => {
    return auth({
        url: `addpost`,
        data,
    })
}