<script setup>
import { onMounted } from 'vue';
import { socketInstance } from '../../socket/socket.js';
import {messageStore} from '../../store/messageStore.js'
import PageLayoutStyle from '../../style/pageLayoutStyle.vue';
const localStorageData =
  uni.getStorageSync("logindata") &&
  JSON.parse(uni.getStorageSync("logindata"));
onMounted(()=>{
    socketInstance.on(`${localStorageData.userid}`, (data) => {
        console.log(data)
      messageStore.setmessage(data.datas)
    });
})
</script>
<template>
    <pageLayoutStyle>
        <view>@我的</view>
        <view v-if="messageStore.message" >
        </view>
        <view v-else>暂无消息</view>
    </PageLayoutStyle>
</template>
<style></style>
