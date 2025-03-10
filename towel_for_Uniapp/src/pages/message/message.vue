<script setup>
import { onMounted, ref } from "vue";
import { socketInstance } from "../../socket/socket.js";
import { messageStore } from "../../store/messageStore.js";
import PageLayoutStyle from "../../style/pageLayoutStyle.vue";
import { onLoad } from "@dcloudio/uni-app";
const localStorageData =
  uni.getStorageSync("logindata") &&
  JSON.parse(uni.getStorageSync("logindata"));
console.log(messageStore.message);
const resData = ref(null);
onLoad(()=>{
if(!localStorageData){   
    uni.reLaunch({  url: '/pages/user/login'})}
})
onMounted(() => {
  uni.request({
    url: `http://127.0.0.1:4000/notifications/${localStorageData.userid}`,
    header: {
      "content-type": "application/json", // 设置请求头
      Authorization: `Bearer ${localStorageData?.jwt}`, // 设置jwt
    },
    success: function (res) {
      resData.value = res.data;
    },
    fail: function (res) {
      console.log(res);
    },
  });
});
</script>
<template>
  <pageLayoutStyle>
    <view>@我的</view>
    <view
      class="message-box"
      v-if="resData"
      v-for="(item, index) in resData"
      :key="index"
    >
      <view class="message-box-head">
        <image :src="item.mentionedUserId[0].headimg" class="massage-headimg">
        </image>
        <view>{{ item.mentionedUserId[0].username }}</view>
      </view>
      <view class="message-box-content">
        {{ item.targetText }}
      </view>
      <view class="message-box-footer">
        <view class="read" v-if="!item.read"> 未读 </view>
        ...
      </view>
    </view>
    <view v-else>暂无消息</view>
  </pageLayoutStyle>
</template>
<style>
.message-box-head {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.massage-headimg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
}
.message-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
}
.read {
  color: rgba(248, 196, 134, 1);
}
.message-box-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
}
</style>
