<script setup>
import { ref } from 'vue';
import Modal from "@/components/modal.vue"
import PostReply from './postReply.vue';
const item=defineProps( ['id','user','postText','postLike',])
const emit=defineEmits(['commentidHandler','reloadHandler'])
const localStorageData = JSON.parse(uni.getStorageSync('logindata'))
const isModal=ref(false)
const isshowReply=ref(false)
const isModalHandler=()=>isModal.value=!isModal.value
const replyHandler=(id,userData)=>{
    const data={
        commentid:id,
        _id:userData[0]._id, username: userData[0].username, headimg:userData[0].headimg
    }
    emit('commentidHandler',data)
    console.log(data)
}
const isshowReplyHandler=()=>{
    isshowReply.value=!isshowReply.value
}
const deleteHandler=(id)=>{
    uni.request({
        url: `http://127.0.0.1:4000/delcomment/${id}`,
        method: 'DELETE',
        header: {
            'content-type': 'application/json',// 设置请求头
            'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
        },
        success: function (res) {
            emit('reloadHandler')
            console.log(res)
        },
        fail: function (res) {
            console.log(res)
        }
    }) 
}
</script>
<template>
        <view class="post">
            <view class="post-head">
                <view class="post-image-name">
                    <image :src="item.user[0].headimg"
                        class="post-image"></image>
                    <view class="post-name">{{ item.user[0].username }}</view>
                </view>
                <view class="post-head-button" @click.stop='isModalHandler'>...</view>
                <Modal v-if="isModal" @deleteHandler="deleteHandler(item.id)" :postUserId='item.user[0]._id'></Modal>
            </view>
            <view class="post-context">{{item.postText}}</view>
            <view class="post-button">
                    <view class="post-icon">
                        <image class="iconlike" src="../../../static/postIcon/赞.svg" mode="scaleToFill"></image>
                    <view>{{item.postLike}}</view>
                    </view>
                    <view @click='replyHandler(item.id,item.user)'>回复</view>
                    <view @click='isshowReplyHandler'>显示回复</view>
            </view>
            <PostReply v-if='isshowReply' :commentid='item.id'></PostReply>
        </view> 
</template>
<style scoped>
.post-context-image{
    margin: auto ;
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
    margin-top: 10rpx;
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
.post-icon{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.iconlike {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    object-fit: cover;

}

</style>