<script setup lang="ts">
import MainStyle from '@/components/MainStyle.vue'
import PostInput from '@/components/PostInput.vue'
</script>

<template>
  <MainStyle>
    <div class="flex items-center">
      <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-10 h-10 rounded-full " alt="headimg">
     : <div>你好我是ai,很高兴为您服务</div>
    </div>
    <div class="fixed  bottom-10  translate-x-1/2">
      <PostInput></PostInput>
    </div>
  </MainStyle>
</template>
<style scoped></style>
