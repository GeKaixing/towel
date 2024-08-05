<script setup>
import postReply from './postReply.vue'
import { ref ,onMounted} from 'vue'
import { getComment } from '../../../services/post/post'
const isPostReply=ref(false)
const props=defineProps(['postId'])
const resData=ref([])
onMounted(()=>{
    getComment(props.postId).then(res=>resData.value=res.data)
})
</script>
<template>
    <div class="p-2 space-y-2 " v-for="(items,index) in resData" :key="index">
        <header class="flex justify-between ">
            <div class="flex gap-2 items-center">
                <div class="h-12 w-12 rounded-ful">
                    <img  class="h-12 w-12 rounded-full" :src="items.users[0].headimg"/>
                </div>
                <div class="text-lg font-bold">{{items.users[0].username }}</div>
            </div>
            <div class="font-bold text-2xl">...</div>
        </header>
        <mian class="pl-14">
            <span>{{ items.commentText }}</span>
        </mian>
        <footer class="flex justify-around ">
            <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            <div class="w-10 h-10 rounded-full bg-gray-500" @click='isPostReply=!isPostReply'>reply</div>
        </footer>
        <postReply :commentId="items._id" v-if="isPostReply"></postReply>
    </div>
</template>
<style></style>