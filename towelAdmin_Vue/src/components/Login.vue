<script setup lang="ts"></script>
<template> 
  <form class="flex flex-col space-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
    <div class="self-center flex items-center space-x-2">
      <img src="@/assets/logo.png" class="w-10 h-10 ">
      <span>towel后台管理</span>
    </div>
    <label for="text">账号</label>
    <input required type="text" id="text" class="bg-[#f6f6f6]  w-[250px]">
    <label for="password">密码</label>
    <input required type="password" id="password" class="bg-[#f6f6f6]  w-[250px]">
    <input type="submit" placeholder="提交" class="bg-[#f6f6f6] w-[50px] self-center">
  </form>
</template>