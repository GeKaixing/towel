<script setup>
import { onMounted, ref } from 'vue'
import { getPost } from '../../../services/post/post'
import { RouterLink } from 'vue-router';
const resData = ref([])
onMounted(() => {
    getPost().then(res => { resData.value = res.data })
})
</script>
<template>
    <main class="flex-1 flex flex-col  rounded-lg space-y-2">
        <div v-for="(items, index) in resData" :key="index">
            <div class="flex flex-col justify-between p-2 gap-2 border-2 border-solid border-gray-500  rounded-lg">
                <header class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <div class="h-12 w-12  rounded-full ">
                            <img class="h-12 w-12  rounded-full " :src="items.user.headimg" />
                        </div>
                        <span class="text-lg font-bold">
                            <RouterLink :to="`user/${items.postUserId}`">
                                {{items.user.username }}
                            </RouterLink>
                        </span>
                    </div>
                    <div class="font-bold text-2xl" @click="(e) => { e.stopPropagation(); }">...</div>
                </header>
                <main class="w-full ">
                    <RouterLink :to="`/postcontent/${items._id}`">
                        {{ items.postText }}
                    </RouterLink>
                </main>
                <footer class="flex justify-around ">
                    <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                    <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                    <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                    <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                </footer>
            </div>
        </div>
    </main>
</template>
<style></style>