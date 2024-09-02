<script setup>
import { UserOutlined, BarChartOutlined, FileOutlined } from '@ant-design/icons-vue'
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
      <bar-chart-outlined />
      <span> 文章管理 </span>
    </router-link>
    <router-link
      to="/echartsadmin"
      class="bg-[#f6f6f6] w-40 h-20 font-bold flex justify-center items-center rounded-[10px] space-x-2"
       :class="changeBgcolorHandler('/echartsadmin')"
    >
      <file-outlined />
      <span> 数据统计 </span>
    </router-link>
  </nav>
</template>
<style></style>
