<script setup lang="ts">
import { useCounterStore } from '@/stores/AddIsShowStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Button from './Button.vue'
const store = useCounterStore()
const { Static } = storeToRefs(store)
const textareaData = ref('')
</script>
<template>
  <Teleport to="body">
    <div
      v-if="Static"
      class="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-100/60 flex justify-center items-center"
      @click.self="store.Switch"
    >
      <div class="flex flex-col w-[400px] max-h-[600px] overflow-auto p-2 gap-2 border-2 border-hostColor rounded-xl" >
        <header class="flex justify-between w-full">
          <Button @switch="store.Switch"><div>取消</div></Button>
          <Button><div>发表</div></Button>
        </header>
        <main class="flex gap-2">
          <div class="flex flex-col items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
              class="w-10 h-10 rounded-full"
              alt="headimg"
            />
            <img
              src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
              class="w-6 h-6 rounded-full"
              alt="headimg"
            />
            <img
              src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
              class="w-6 h-6 rounded-full"
              alt="headimg"
            />
          </div>
          <textarea
            class="w-full mt-2 h-auto resize-none overflow-auto outline-none text-xl max-h-[552px]"
            placeholder="输入内容"
            v-model="textareaData"
            rows="1"
          ></textarea>
        </main>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
