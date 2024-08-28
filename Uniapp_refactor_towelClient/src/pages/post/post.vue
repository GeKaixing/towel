<script setup>
import pageLayoutStyle from '@/style/pageLayoutStyle.vue'
import search from './search/search.vue'
import post from '../../components/post.vue'
import { computed, onMounted, ref, watch } from "vue"
import {postStore}from "../../store/postStore"
const resData = ref([])
const inputData=ref('')

const searchData=ref([])
/* 搜索数据处理 /search 状态管理*/
const searchDataHandler=(value)=>{
    searchData.value=value
}
const dispose =computed(()=>{
    return inputData.value?searchData.value:resData.value;
})
onMounted(() => {
    uni.request({
        url: 'http://127.0.0.1:4000/post',
        header: {
            'content-type': 'application/json' // 设置请求头
        },
        success: function (res) {
            resData.value = res.data
        },
        fail: function (res) {
            console.log(res)
        }
    })
})
watch(()=>postStore.reload,()=>{
    uni.request({
        url: 'http://127.0.0.1:4000/post',
        header: {
            'content-type': 'application/json' // 设置请求头
        },
        success: function (res) {
            resData.value = res.data
        },
        fail: function (res) {
            console.log(res)
        }
    })
})
</script>
<template>
    <pageLayoutStyle>
        <search @searchDataHandler="searchDataHandler" 
        v-model="inputData" 
        ></search>
        <post v-for="(post,index ) in dispose"
        :key="index"
        :id="post._id" 
        :user="post.user" 
        :postText="post.postText" 
        :postImages="post.postImages " 
        :postLike="post.postLike"
        :postComment="post.postComment"
        :postFavorite="post.postFavorite"
        :postUserId="post.postUserId"
        ></post>
    </pageLayoutStyle>
</template>
<style scoped>
.post-context-image {
    margin: auto;
}

.post {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    border-radius: 10rpx;
    padding: 10rpx;
    border: 4rpx solid #f6f6f6;
    margin-bottom: 10rpx;
}

.post-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.post-image-name {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10rpx;
}

.post-image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
}

.post-name {
    font-weight: bold;
}

.post-head-button {
    font-weight: bold;
}

.post-button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.post-button>view>image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    object-fit: cover;
}

.post-button-icon {
    display: flex;
    align-items: center;
}
</style>