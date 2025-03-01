<script setup lang="ts">
const emit=defineEmits(['switch'])
</script>
<template>
    <div class="h-[32px] w-[64px] cursor-pointer bg-gray-100 flex justify-center items-center rounded-xl hover:bg-assistantColor" @click="emit('switch')">
      <slot></slot>
    </div>
</template>
