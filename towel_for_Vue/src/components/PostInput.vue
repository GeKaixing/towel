<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('')
</script>

<template>
  <form class="flex flex-row  h-[32px] gap-4 margin-auto mt-2">
    <input placeholder="  评论" type="text" v-model="inputValue" class="bg-gray-200 rounded-xl w-[240px]" />
    <div class="h-[32px] w-[64px] bg-gray-200 flex justify-center items-center rounded-xl hover:bg-assistantColor">发表</div>
  </form>
</template>
