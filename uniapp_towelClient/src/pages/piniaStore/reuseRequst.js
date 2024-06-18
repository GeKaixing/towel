import { defineStore } from "pinia";
export const useReuseRequstStore = defineStore("ReuseRequstStore", () => {
    const urlHandler = (url, front = "http://127.0.0.1:4000") => {
        const front = uni.getStorageSync('Requesturl') || 'http://127.0.0.1:4000'
        const path = `${url}`
        return `${front}/${path}`
    }
    const methodHandler = (method) => {
        const methods = method || "GET"
        return methods.toUpperCase()
    }
    const failHandler = (err) => {
        console.log(err);
    }
    const reuseRequestReply = (options) => {
        const { success, url, method = 'GET', data, fail = failHandler } = options;
        const methods = methodHandler(method);
        const path = urlHandler(url)
        uni.request({
            url: path,
            method: methods,
            data,
            header: {
                'Access-Control-Allow-Origin': '*',
                'token': uni.getStorageSync('jwt'),
            },
            success,
            fail,
        })
    }
    return {
        reuseRequestReply
    }
})