<script setup>
import { computed } from "vue";
import { ref, watch } from "vue"
const inputData = ref(null)
const post = defineProps(['id', 'commentid'])
console.log(
    post.commentid
)
/* const commentid = ref(null)
watch(post, () => {
    commentid.value = post.commentid
}) */
const emit = defineEmits(['reloadHandler'])
const localStorageData = JSON.parse(uni.getStorageSync('logindata'))
const sendInputData = () => {
    commentid.value[0] ? uni.request({
        url: `http://127.0.0.1:4000/addreply`,
        method: 'POST',
        header: {
            'content-type': 'application/json',// 设置请求头
            'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
        },
        data: {
            data: {
                postId: post.id,
                commentId: post.commentid[0],
                replyUserId: localStorageData.userid,
                replyText: inputData.value,
                replyToreplyUserId: inputReplyData.replyToreplyUserId || null,
                replyImages: null,
                replyLike: 0,
                replyComment: null
            }
        },
        success: function () {
            emit('reloadHandler')
            inputData.value = ''
        },
        fail: function (res) {
            console.log(res)
        }
    }) :
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

</script>
<template>
    <view class="input-box">
        <view>{{ post.commentid.username }}</view>
        <input class="input" placeholder="评论" v-model="inputData">
        <view class="input-button" @click="sendInputData">发表</view>
    </view>

</template>
<style>
.input-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10rpx;
    width: 100%;
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