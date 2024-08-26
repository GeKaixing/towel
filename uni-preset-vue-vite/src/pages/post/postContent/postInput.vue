<script setup>
import { ref } from "vue"
import {postStore} from '@/store/postStore.js'
import {socketInstance}from '../../../socket/socket.js'

const inputData = ref(null)
const post = defineProps(['id', 'commentid'])
const emit = defineEmits(['reloadHandler','deleteCommentid'])
const localStorageData = JSON.parse(uni.getStorageSync('logindata'))
const commentApi=()=>{
    uni.request({
            url: `http://127.0.0.1:4000/addcomment/${post.id}`,
            method: 'POST',
            header: {
                'content-type': 'application/json',// 设置请求头
                'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
            },
            data: {
                data: {
                    postId: post.id,
                    commentUserId: localStorageData.userid,
                    Text: inputData.value,
                    Image: null,
                    Like: 0
                }
            },
            success: function () {
                emit('reloadHandler')
                inputData.value = ''
            },
            fail: function (res) {
                console.log(res)
            }
        })
}
const replyApi=()=>{
    uni.request({
        url: `http://127.0.0.1:4000/addreply`,
        method: 'POST',
        header: {
            'content-type': 'application/json',// 设置请求头
            'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
        },
        data: {
            data: {
                postId: post.id,
                commentId: post?.commentid?.commentid||postStore.replytoreply.commentId,
                replyUserId: localStorageData.userid,
                replyText: inputData.value,
                replyToreplyUserId:postStore.replytoreply?.userid|| null,
                replyImages: null,
                replyLike: 0,
                replyComment: null
            }
        },
        success: function () {
            emit('reloadHandler')
            if(postStore.replytoreply?.userid)socketInstance.emit(`newMessage`, { newMessage: true, userid: postStore.replytoreply.userid })
            postStore.setReloadReply()
            inputData.value = ''
            deleteHandler()
        },
        fail: function (res) {
            console.log(res)
        }
    }) 
}
const sendInputData = () => {
    post?.commentid||postStore?.replytoreply?replyApi() :commentApi()
}

const deleteHandler=()=>{
    emit('deleteCommentid')
}
</script>
<template>
    <view class="input-box">
        <view v-if='post?.commentid||postStore.replytoreply'>{{ post.commentid?.username }}</view>
        <view v-if='post?.commentid' class='input-dot' @click="deleteHandler">X</view>
        <view v-if='postStore.replytoreply'>{{ postStore.replytoreply?.username }}</view>
        <view v-if='postStore.replytoreply' class='input-dot' @click="postStore.deleteReplytoreply()">X</view>
        <input class="input" placeholder="评论" v-model="inputData">
        <view class="input-button" @click="sendInputData">发表</view>
    </view>

</template>
<style>
.input-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    gap: 10rpx;
    width: 100%;
}
.input-dot{
    width:30rpx;
    height:30rpx;
    border-radius:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(248, 196, 134, 1);
}
.input {
    background-color: #f6f6f6;
    height: 70rpx;
    border-radius: 10rpx;
    width: 70%;
}

.input-button {
    height: 70rpx;
    width: 15%;
    background-color: #f6f6f6;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>