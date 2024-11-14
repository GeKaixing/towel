<script setup lang="ts">
import { UserOutlined, BarChartOutlined, FileOutlined,CommentOutlined,MessageOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router';
const route=useRoute()
const changeBgcolorHandler=(parameter)=>{
  return route.path===parameter?'bg-[--hostColor]':"bg-[#f6f6f6]"
}
</script>
<template>
  <nav class="flex flex-col gap-10 w-60 h-full fixed left-0 items-center">
    <div>
      <img src='@/assets/logo.png'>
    </div>
    <router-link
      to="/"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
      :class="changeBgcolorHandler('/')"
      href=""
    >
      <UserOutlined />
      <span> 用户管理 </span>
    </router-link>
    <router-link
      to="/postadmin"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
       :class="changeBgcolorHandler('/postadmin')"
    >
      
      <file-outlined />
      <span> 文章管理 </span>
    </router-link>

    <router-link
      to="/commentadmin"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
       :class="changeBgcolorHandler('/commentadmin')"
    >
    <MessageOutlined />
      <span> 评论管理 </span>
    </router-link>

    <router-link
      to="/replyadmin"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
       :class="changeBgcolorHandler('/replyadmin')"
    >
    <CommentOutlined />
      <span> 回复管理 </span>
    </router-link>

    <router-link
      to="/echartsadmin"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
       :class="changeBgcolorHandler('/echartsadmin')"
    >
    <bar-chart-outlined />
      <span> 数据统计 </span>
    </router-link>
  </nav>
</template>
<style></style>
