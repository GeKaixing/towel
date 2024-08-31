<script setup>
import { ExpandAltOutlined, ShrinkOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const isFull = ref(true)
const fullHandler = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFull.value = !isFull.value
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}
document.addEventListener('fullscreenchange', () => {
  isFull.value = !isFull.value
})
</script>
<template>
  <div class="mb-2 h-14 bg-[#f6f6f6] flex items-center justify-end p-2">
    <div class="self-end flex items-center space-x-2 font-bold">
      <ExpandAltOutlined v-if="isFull" @click="fullHandler" />
      <ShrinkOutlined v-else @click="fullHandler" />
      <img src="@/assets/logo.png" class="w-10 h-10 rounded-full" />
      <div>test</div>
    </div>
  </div>
</template>
<style></style>
