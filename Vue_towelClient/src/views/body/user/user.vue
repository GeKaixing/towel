<script setup>
import { ref } from 'vue'
import Post from '../post/Post.vue'
import PostComment from '../post/postComment.vue'
import PostReply from '../post/postReply.vue'
import { useRoute } from 'vue-router';
import useLocaStorage from '../../../hook/useLocaStorage'
const title =ref(['帖子','评论','回复'])
const isShowWho=ref(0)
const router=useRoute()
const {getLocaStorageData,setLocaStorageData}=useLocaStorage()
const outLogin=()=>{
    setLocaStorageData()
    window.location.href='/'
}
</script>
<template>
    <main class="flex-1 flex flex-col  rounded-lg gap-6">
        <header class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="h-12 w-12rounded-full ">
                    <img  class="h-12 w-12 rounded-full " :src='getLocaStorageData().headimg'/>
                </div>
                <span class="text-lg font-bold">{{getLocaStorageData().username}}</span>
            </div>
            <div class="flex items-center gap-2 ">
                <div class="font-bold text-lg text-red-500" @click="outLogin">登出</div>
                <div class="font-bold text-2xl">...</div>
            </div>
        </header>
        <div class="flex justify-around font-bold text-lg">
            <div v-for="(item,index) in title" :key="index" @click="isShowWho=index">{{item}}</div>
        </div>
        <Post  :userId='router.params.id' v-if="isShowWho===0"></Post>
        <PostComment :userId='router.params.id' v-if="isShowWho===1"></PostComment>
        <PostReply  :userId='router.params.id' v-if="isShowWho===2"></PostReply>
    </main>
</template>
<style></style>