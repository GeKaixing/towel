<script setup>
import postVue from '../../../components/post.vue'
import postInput from './postInput.vue'
import postComment from './postComment.vue'
import pageLayout from '../../../style/pageLayout.vue'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from "vue"
const post = ref(null)
const commentData=ref(null)
onLoad((option) => {
    post.value = JSON.parse(decodeURIComponent(option.data));
})
onMounted(()=>{
    uni.request({
        url: `http://127.0.0.1:4000/comment/${post.value.id}`,
        header: {
            'content-type': 'application/json' // 设置请求头
        },
        success: function (res) {
            commentData.value=res.data
        },
        fail: function (res) {
            console.log(res)
        }
    })
})
</script>
<template>
    <pageLayout>
        <postVue :id="post._id" :user="post.user" :postText="post.postText" :postImages="post.postImages"
            :postLike="post.postLike" :postComment="post.postComment" :postFavorite="post.postFavorite"></postVue>
        <postInput></postInput>
        <postComment 
        v-for="(post,index) in commentData"
        :key="index"
        :id="post._id" 
        :postId='post.postId'
        :user="post.users" 
        :postText="post.commentText" 
        :postImages="post.commentImages " 
        :postLike="post.commentLike"
        ></postComment>
    </pageLayout>

</template>
<style></style>