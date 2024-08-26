<script setup>
import { onMounted, watch, ref } from "vue";
import pageLayout from "../../style/pagelayout.vue";
import login from "./login.vue";
import post from "../../components/post.vue";
import postComment from "../../pages/post/postContent/postComment.vue";
import userReply from "../../components/userReply.vue";
const postData = ref(null);
const commentData=ref(null)
const replyData=ref(null)
const reloadReply=ref(false)
const index = ref(0);
const reloadReplyHandler=()=>reloadReply.value=!reloadReply.value;
const getusepost=()=>{
    uni.request({
    url: `http://127.0.0.1:4000/getusepost/${localStorageData.userid}`,
    header: {
      Authorization: `Bearer ${localStorageData?.jwt}`, // 设置jwt
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
      postData.value = res.data;
    },
    fail: function (res) {
      console.log(res);
    },
  });
}
const getuseComment=()=>{
    uni.request({
    url: `http://127.0.0.1:4000/getusecomment/${localStorageData.userid}`,
    header: {
      Authorization: `Bearer ${localStorageData?.jwt}`, // 设置jwt
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
    commentData.value = res.data;
    },
    fail: function (res) {
      console.log(res);
    },
  });
}
const getuseReply=()=>{
    uni.request({
    url: `http://127.0.0.1:4000/getusereply/${localStorageData.userid}`,
    header: {
      Authorization: `Bearer ${localStorageData?.jwt}`, // 设置jwt
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
        replyData.value = res.data;
    },
    fail: function (res) {
      console.log(res);
    },
  });
}
const selectHandler = (page) => {
  index.value = page;
  if(index.value===0){
    getusepost()
  }else if(index.value===1){
    getuseComment()
  }else if(index.value===2){
    getuseReply()
  }
};
const localStorageData =
  uni.getStorageSync("logindata") &&
  JSON.parse(uni.getStorageSync("logindata"));
const clearHandler = () => {
  try {
    uni.setStorageSync("logindata", "");
    uni.reLaunch({ url: "/pages/user/user" });
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
    getusepost()
});
watch(reloadReply,()=>{getuseReply()})
</script>
<template>
  <pageLayout>
    <view v-if="localStorageData">
      <view class="user">
        <view class="user-info">
          <image :src="localStorageData.headimg"></image>
          <view>{{ localStorageData.username }}</view>
        </view>
        <view class="user-setting-logout">
          <view class="user-setting">设置</view>
          <view class="user-logout" @click="clearHandler">登出</view>
        </view>
      </view>
      <view class="user-bar">
        <view @click="selectHandler(0)">文章</view>
        <view @click="selectHandler(1)">评论</view>
        <view @click="selectHandler(2)">回复</view>
      </view>
      <post
        v-if="index === 0"
        v-for="(post, index) in postData"
        :key="index"
        :id="post._id"
        :user="post.user"
        :postText="post.postText"
        :postImages="post.postImages"
        :postLike="post.postLike"
        :postComment="post.postComment"
        :postFavorite="post.postFavorite"
        :postUserId="post.postUserId"
      ></post>
      <postComment
        v-if="index === 1"
        v-for="(post, index) in commentData"
        :key="index"
        :id="post._id"
        :postId="post.postId"
        :user="post.users"
        :postText="post.commentText"
        :postImages="post.commentImages"
        :postLike="post.commentLike"
      ></postComment>
      <userReply 
      v-if='index === 2'
        v-for="(post, index) in replyData"
        :key="index"
        :post="post"
        @reloadReplyHandler="reloadReplyHandler"
        >
      </userReply>
    </view>
    <login v-else></login>
  </pageLayout>
</template>
<style scoped>
.user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.user-setting-logout {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
}
.user-setting {
  color: rgba(248, 196, 134, 1);
}
.user-info > image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
}
.user-bar {
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  display: flex;
  justify-content: space-between;
}
</style>
