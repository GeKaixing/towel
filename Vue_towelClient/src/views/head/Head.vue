<script setup>
import { computed, ref } from 'vue'
import useLocaStorage from '../../hook/useLocaStorage'
const { getLocaStorageData } = useLocaStorage()
const titleData = ref([
    { title: '首页', url: '/'},
    { title: '关于', url: '/about' },
    { title: '发帖', url: '/add' },
    { title: '消息', url: '/message'},
    { title: 'Ai', url: '/llama' },
    { title: '设置', url: '/setting'},
    { title: '我的', url: `/user/${getLocaStorageData().userid}` },
    { title: '登录', url: "/login" },
    { title: '注册', url: "/signin" },
])
const title = computed(() => {
    return getLocaStorageData().jwt ? titleData.value.slice(0, 7) : titleData.value
})
</script>
<template>
    <header class="w-[20%] fixed  top-2   ml-[10%] flex justify-start ">
        <nav class=" flex flex-col w-full  justify-around items-end  h-1/2 ">
            <RouterLink v-for=" (item, index) in title" :key="index" :to="item.url" class=" w-full h-[50px]
                text-lg font-bold
                bg-white flex justify-start items-center hover:bg-gray-300 rounded-lg ">
                {{ item.title }}</RouterLink>
        </nav>
    </header>
</template>
<style></style>