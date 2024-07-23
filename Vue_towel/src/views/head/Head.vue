<script setup>
import { ref } from 'vue'
const title = ref([{title:'首页',url:'/'},
    {title:'关于',url:'/about'},
    {title:'发帖',url:'/add'},
    {title:'消息',url:'/message'},
    {title:'设置',url:'/setting'},
    {title:'我的',url:"/user"},
    {title:'登录',url:"/login"},
    {title:'注册',url:"/signin"},
    ])
</script>
<template>
    <header>
        <nav class="fixed  flex flex-col  justify-around items-end  w-[22%] h-1/2  ">
            <RouterLink v-for=" (item, index) in title" :key="index" :to="item.url" 
                class="w-1/2 h-[50px] bg-white flex justify-start items-center hover:bg-gray-300 rounded-lg font-bold">
                {{ item.title }}</RouterLink>
        </nav>
    </header>
    <div class="w-[30%] h-1/2 bg-black "> </div><!-- 处理fixed 元素 -->
</template>
<style></style>