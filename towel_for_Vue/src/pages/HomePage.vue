<script setup lang="ts">
import PostFoot from '@/components/PostFoot.vue';
import PostHear from '@/components/PostHear.vue';
import { useRouter } from "vue-router"

const router = useRouter()
 const navigateTo = (path: string) => {
  router.push(path)
}

</script>
<template>
<div class="p-2 border-2 border-gray-200 rounded-lg m-2" @click="navigateTo('/comments')">
  <header class="flex flex-row items-center justify-between gap-2">
    <PostHear></PostHear>
    <!-- mroe -->
    <div class="text-3xl font-blod ">...</div>
  </header>
  <main>
    <div>?</div>
    <div class="w-full h-40 "></div>
  </main>
  <PostFoot></PostFoot>
</div>
</template>
