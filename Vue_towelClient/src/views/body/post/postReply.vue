<script setup>
import { getAllreply } from '../../../services/post/post'
import {onMounted,ref} from 'vue'
const props=defineProps(['commentId'])
const resData=ref([])
onMounted(()=>{
    getAllreply(props.commentId).then(res=>{resData.value=res.data;console.log(res.data)})
})
</script>
<template>
    <div class="w-full space-y-2" v-for="(items,index) in resData" :key="index">
        <div>
            <div class="flex justify-between gap-2 items-center">
                <div class="flex items-center gap-2">
                    <div class="w-12 h-12 rounded-full bg-gray-500">
                        <img class="w-12 h-12 rounded-full " :src="items.replyUser.headimg"/>
                    </div>
                    <span class="text-lg font-bold">{{  items.replyUser.username}}</span>
                </div>
                <span class="text-2xl font-bold">...</span>
            </div>
            <span class="pl-14">
                    {{ items.replyText }}
            </span>
        </div>
    </div>
</template>
<style></style>