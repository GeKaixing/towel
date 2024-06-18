<script setup>
/* 
* 用户发消息，服务器存储消息根据用户id Find然后将未读消息加载到前端
* 由于watch 需要mongoose 链接副本集太难了，所以先用socket.io
* 可以在用户发信息就可以时把emit发送的数据到后端
* 逻辑：
    用户进入app，app请求未读消息，加载message组件加载未读消息显示列表
    socket.io开启一个用户的房间，期间其他用户@用户评论或赞回复时，用户可以
    接受到消息。
    当用户评论或者回复，连接其目标用户的房间，发送消息；目标用户的消息列表会显示
    别人的评论或者回复。发送完成，关闭目标房间的连接；
*/
/* 
*   名字
*头像 回复你：<text>
*/
import { ref, onMounted } from 'vue';
//import { getSocketInstance } from '../../piniaStore/socket';
import { useSocketStore } from '../../piniaStore/socketStore';
import { storeToRefs } from 'pinia';
const {sockeData}=storeToRefs(useSocketStore())
const inPostHandler = (postId) => {
    uni.request({
        url: `http://127.0.0.1:4000/findonepost/${postId}`,
        header: {
            'token': uni.getStorageSync('jwt'),
        },
        success: (res) => {
            const data = encodeURIComponent(JSON.stringify(res.data[0]))
            uni.navigateTo({
                url: `/pages/DetailPage/DetailPage?data=${data}`
            })
        },
        fail: (error) => {
            console.log(error)
        }
    })
}
</script>
<template>
    <view class="pushMessage">
        <view v-for="item of sockeData">
            <view class="pushMessageBox" @click="inPostHandler(item.postId)">
                <view class="messageHead">
                    <view class="messageHeadimg">
                        <image :src="item.mentionedUserId[0].headimg"></image>
                    </view>
                    <view class="messageName"> {{ item.mentionedUserId[0].username }}</view>
                </view>
                <view class="messageContent">
                    <view class="messageReply">
                        <span>回复你:</span>
                        <view>{{ item.targetText }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="messageTip">目前有{{sockeData.length}}条消息</view>
    </view>
</template>
<style>
.messageTip{
    margin: 0 auto;
}
.messageReply {
    display: flex;
    flex-direction: row;

}
.pushMessage {
    margin: auto;
    width: 80%;
    margin-top: 16rpx;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}
.pushMessageBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}
.messageHead {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;
}


.messageHeadimg>image {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
}

.messageContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>