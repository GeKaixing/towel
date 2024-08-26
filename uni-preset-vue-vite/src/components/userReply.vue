<script setup>
import {  ref } from "vue";
import Modal from "@/components/modal.vue"
const localStorageData = JSON.parse(uni.getStorageSync("logindata"));
const props=defineProps(['post'])
const emit =defineEmits(['reloadReplyHandler'])
const item=props.post
const isModal = ref(null);
const isModalHandler = (id) => { 
   if(isModal.value===id){
      isModal.value=null
   }else{
    isModal.value=id
   }
}
const deleteHandler = (id) => {
  uni.request({
    url: `http://127.0.0.1:4000/delreply/${id}`,
    method: 'DELETE',
    header: {
      "content-type": "application/json", // 设置请求头
      Authorization: `Bearer ${localStorageData?.jwt}`, // 设置jwt
    },
    success: function () {
      emit('reloadReplyHandler')
      uni.showToast({
        title: '删除成功',
        duration: 2000
      })
    },
    fail: function (res) {
      console.log(res);
    },
  });
}

</script>
<template>
  <view  class="reply">
    <view class="reply-content">
      <view class="reply-name">{{ item.replyUser.username }}
        <view v-if='item.replyToreplyUser?.username'>@{{ item.replyToreplyUser.username }}</view>
      </view>
      <view>:</view>
      <view>{{ item.replyText }}</view>
    </view>
    <view class="reply-button" @click.stop='isModalHandler(item._id)'>...</view>
    <Modal v-if="isModal===item._id" @deleteHandler="deleteHandler(item._id)" :postUserId="item.replyUserId">
    </Modal>
  </view>
</template>
<style scoped>
.slot {
  background-color: #f6f6f6;
  width: 400rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
}
.reply {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10rpx;
}

.reply-content {
  display: flex;
  flex-direction: row;
  gap: 10rpx;
}

.reply-name {
  font-weight: bold;
  display: flex;

}

.reply-button {
  font-weight: bold;
}
</style>
