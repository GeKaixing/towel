<script setup lang="ts">
import Button from '@/components/Button.vue'
import Image from '@/components/Image.vue'
import { onMounted, ref } from 'vue'
const inputValue = ref<string>('')
const sliceData = ref()
const isshow = ref(false)
const navigateTo = (path: string) => {
  window.open(path, '_blank')
}

onMounted(() => {
  fetch('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot')
    .then((response) => response.json())
    .then((data) => {
      sliceData.value = data.data.slice(1, 5)
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>

<template>
  <div class="w-[300px] h-screen ">
    <!-- 搜索框 -->
    <form class="w-full my-2">
      <input
        class="bg-gray-100 w-full rounded-xl h-[40px]"
        placeholder="  sreach more"
        v-model="inputValue"
      />
    </form>
    <!-- 推荐关注 -->
    <div class="flex flex-col gap-2">
      <div
        class="self-center bg-gray-100 hover:bg-gray-300 rounded-xl p-2 w-40 flex items-center justify-center"
      >
        推荐关注
      </div>
      <div class="flex justify-between items-center">
        <Image
          src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
          class="w-10 h-10 rounded-full"
          alt="headimg"
        />
        <Button>关注</Button>
      </div>
      <div class="flex justify-between items-center">
        <img
          src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
          class="w-10 h-10 rounded-full"
          alt="headimg"
        />
        <Button>关注</Button>
      </div>
      <div class="flex justify-between items-center">
        <img
          src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
          class="w-10 h-10 rounded-full"
          alt="headimg"
        />
        <Button>关注</Button>
      </div>
      <div class="flex justify-between items-center">
        <img
          src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"
          class="w-10 h-10 rounded-full"
          alt="headimg"
        />
        <Button>关注</Button>
      </div>
      <div class="self-center">more...</div>
    </div>
    <!-- 今日头条 -->
    <div class="flex flex-col gap-2 mt-2">
      <div
        class="self-center bg-gray-100 hover:bg-gray-300 rounded-xl p-2 w-40 flex items-center justify-center"
      >
        今日头条
      </div>
      <div v-for="(item, index) in sliceData" :key="index">
        <div
          class="bg-gray-100 hover:bg-gray-300 rounded-xl p-2 cursor-pointer"
          @click="() => navigateTo(item.url)"
        >
          <div>{{ item.title }}</div>
          <div>{{ item.hot_value }}</div>
        </div>
      </div>
    </div>
    <!-- 友情链接 -->
    <div class="flex mt-2 p-2 gap-2 cursor-pointer">
      <div @click="() => navigateTo('https://github.com/GeKaixing/towel')">github</div>
      <div ref="miniAppTextDom">
        <div class="relative" @mouseover="isshow = true" @mouseout="isshow = false">
          小程序
          <div class="absolute top-0">
            <Image
              class="w-24 h-24"
              src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/wexinapp.jpg"
              v-if="isshow"
            ></Image>
          </div>
        </div>
      </div>
      <div>视频</div>
    </div>
  </div>
</template>
<style scoped></style>
