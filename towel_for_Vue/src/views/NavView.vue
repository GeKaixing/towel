<script setup lang="ts">
import { useCounterStore } from "@/stores/AddIsShowStore";
import { useRouter } from "vue-router"
const store = useCounterStore();
const router = useRouter()
 const navigateTo = (path: string) => {
  router.push(path)
}

</script>
<template>
  <div class=" text-xl w-full text-black h-[500px]">
    <div class="w-36 h-10 cursor-pointer" @click="navigateTo('/')">
    主页
    </div>
    <div class="w-36 h-10 cursor-pointer" @click="navigateTo('/ai')">
    AI
    </div>
    <div class="w-36 h-10 cursor-pointer" @click="()=>store.Switch()">
    发帖
    </div>
    <div class="w-36 h-10 cursor-pointer" @click="navigateTo('/message')">
    消息
    </div>
    <div class="w-36 h-10 cursor-pointer" @click="navigateTo('/setting')">
    设置
    </div>
    <div class="w-36 h-10 cursor-pointer" @click="navigateTo('/user/0')">
      个人主页
    </div>
  </div>
</template>
<style scoped>
</style>
