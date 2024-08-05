<script setup>
import postComment from "./postComment.vue";
import postInput from "./postInput.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue'
import { getOnePost } from '../../../services/post/post'
const route = useRoute()
const resData = ref([])
onMounted(() => {
    getOnePost(route.params.id).then((res) => {   resData.value = res.data[0] })
})
</script>
<template>
    <main class="flex-1 flex flex-col  rounded-lg gap-2">
        <div class="flex flex-col justify-between p-2 gap-2 border-2 border-solid border-gray-500  rounded-lg">
            <header class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="h-12 w-12 bg-gray-500 rounded-full ">
                        <img class="h-12 w-12 bg-gray-500 rounded-full "    v-if="resData && resData.user" :src="resData.user.headimg" />
                    </div>
                    <span class="text-lg font-bold"  v-if="resData && resData.user">{{ resData.user.username }}</span>
                </div>
                <div class="font-bold text-2xl">...</div>
            </header>
            <main class="w-full ">
                {{ resData.postText }}
            </main>
            <footer class="flex justify-around ">
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            </footer>
        </div>
        <postInput></postInput>
        <postComment :postId="route.params.id"></postComment>
    </main>
</template>
<style></style>