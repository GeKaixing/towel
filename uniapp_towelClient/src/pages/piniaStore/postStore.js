import { defineStore } from "pinia";
import { ref } from 'vue'
export const usePostStore = defineStore('postStore', () => {
    const result = ref(null);
    //请求帖子所有数据
    const postUniRequst = () => {
        uni.request({
            url: 'http://127.0.0.1:4000/post',
            success: (res) => {
                result.value = res.data;
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
    //请求登录用户所有帖子数据
    const userMessagePost=()=>{
        uni.request({
            url: `http://127.0.0.1:4000/getusepost/${uni.getStorageSync('userid')}`,
            header:{
                token:uni.getStorageSync('jwt')
            },
            success: (res) => {
                result.value = res.data;
         
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
    return {
        result, postUniRequst,userMessagePost
    }
})