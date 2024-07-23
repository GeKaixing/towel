<script setup>
import { ref } from 'vue'
import Post from '../post/Post.vue'
import PostComment from '../post/postComment.vue'
import PostReply from '../post/postReply.vue'
const title =ref(['帖子','评论','回复'])
const isShowWho=ref(0)
</script>
<template>
    <main class="flex-1 flex flex-col  rounded-lg gap-6">
        <header class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="h-12 w-12 bg-gray-500 rounded-full "></div>
                <span class="text-lg font-bold">name</span>
            </div>
            <div class="flex items-center gap-2 ">
                <div class="font-bold text-lg text-red-500">登出</div>
                <div class="font-bold text-2xl">...</div>
            </div>
        </header>
        <div class="flex justify-around font-bold text-lg">
            <div v-for="(item,index) in title" :key="index" @click="isShowWho=index">{{item}}</div>
        </div>
        <Post v-if="isShowWho===0"></Post>
        <PostComment v-if="isShowWho===1"></PostComment>
        <PostReply v-if="isShowWho===2"></PostReply>
    </main>
</template>
<style></style>