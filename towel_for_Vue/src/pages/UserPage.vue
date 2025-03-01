<script setup>
import Button from '@/components/Button.vue'
import Image from '@/components/Image.vue'
import { ref } from 'vue';
const listIndex =ref(0)
</script>
<template>
  <div class="relative h-[100px]">
    <div class="bg-hostColor w-full h-[100px]"></div>
    <div class="absolute top-1/2 left-4 flex flex-col items-center gap-2">
      <Image class="rounded-full border-2 border-assistantColor"></Image>
      <div>UserName</div>
      <div class="flex gap-2">
        <div>关注{{ 0 }}</div>
        <div>被关注{{ 0 }}</div>
        <div>发帖{{ 0 }}</div>
      </div>
    </div>
    <div class="absolute bottom right-4 flex flex-col items-center gap-2">
      <Button class="text-xl">...</Button>
    </div>
  </div>
  <div class="h-[108px]"></div>
  <div class="flex justify-center gap-2">
    <Button @click="listIndex=0">post</Button>
    <Button  @click="listIndex=1">comment</Button>
    <Button  @click="listIndex=2">reply</Button>
  </div>
  <div>
    <div v-if="listIndex==0"> 0No notifications yet!</div>
    <div v-if="listIndex==1"> 1No notifications yet!</div>
    <div v-if="listIndex==2"> 2No notifications yet!</div>
  </div>
</template>
