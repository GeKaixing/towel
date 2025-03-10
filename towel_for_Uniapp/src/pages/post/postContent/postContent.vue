<script setup>
import postVue from "../../../components/post.vue";
import postInput from "./postInput.vue";
import postComment from "./postComment.vue";
import pageLayoutStyle from "../../../style/pageLayoutStyle.vue";
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref, watch } from "vue";
const post = ref(null);
const commentData = ref(null);
const reload = ref(false);
const commentid = ref(null);
const reloadHandler = () => {
  reload.value = !reload.value;
};
/* 状态提升 */
const commentidHandler = (id) => {
  commentid.value = id;
};
/* 状态提升 */
const deleteCommentid = () => {
  commentid.value = null;
};
onLoad((option) => {
  post.value = JSON.parse(decodeURIComponent(option.data));
});
const requestHandle = () => {
  uni.request({
    url: `http://127.0.0.1:4000/comment/${post.value.id}`,
    header: {
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
      commentData.value = res.data;
    },
    fail: function (res) {
      console.log(res);
    },
  });
};
watch(reload, () => {
  requestHandle();
});
onMounted(() => {
  requestHandle();
});
</script>
<template>
  <postVue
    :id="post._id"
    :user="post.user"
    :postText="post.postText"
    :postImages="post.postImages"
    :postLike="post.postLike"
    :postComment="post.postComment"
    :postFavorite="post.postFavorite"
  ></postVue>
  <pageLayoutStyle>
    <postInput
      :id="post.id"
      :commentid="commentid"
      @reloadHandler="reloadHandler"
      @deleteCommentid="deleteCommentid"
    ></postInput>
    <postComment
      v-for="(post, index) in commentData"
      :key="index"
      :id="post._id"
      :postId="post.postId"
      :user="post.users"
      :postText="post.commentText"
      :postImages="post.commentImages"
      :postLike="post.commentLike"
      @reloadHandler="reloadHandler"
      @commentidHandler="commentidHandler"
    ></postComment>
  </pageLayoutStyle>
</template>
<style></style>
