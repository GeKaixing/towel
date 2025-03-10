<script setup>
import Button from '@/components/Button.vue'
import Image from '@/components/Image.vue'
import MainStyle from '@/components/MainStyle.vue'
import { ref } from 'vue'
const listIndex = ref(0)
</script>
<template>
  <MainStyle>
    <header class="flex justify-between">
      <Button @click="listIndex = 0">全部</Button>
      <Button @click="listIndex = 1">私聊</Button>
      <Button @click="listIndex = 2">@我的</Button>
    </header>
    <main class="mt-2">
      <div v-if="listIndex == 0" class="flex flex-col gap-2">
        <div>
          <header class="flex gap-2">
            <Image class="w-10 h-10 rounded-full"></Image>
            <div class="text-xl font-bold">userName</div>
          </header>
          <main>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic commodi ex animi harum
              nostrum, ipsa excepturi esse blanditiis veritatis laboriosam atque, alias, nam sit
              labore aliquid sint perspiciatis totam nihil.
            </div>
          </main>
        </div>
        <div>
          <header class="flex gap-2">
            <Image class="w-10 h-10 rounded-full"></Image>
            <div class="text-xl font-bold">userName</div>
          </header>
          <main>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic commodi ex animi harum
              nostrum, ipsa excepturi esse blanditiis veritatis laboriosam atque, alias, nam sit
              labore aliquid sint perspiciatis totam nihil.
            </div>
          </main>
        </div>
      </div>
      <div v-if="listIndex == 1" class="gap-2">
        <div>
          <header class="flex gap-2">
            <Image class="w-10 h-10 rounded-full"></Image>
            <div class="text-xl font-bold">userName</div>
          </header>
          <main>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic commodi ex animi harum
              nostrum, ipsa excepturi esse blanditiis veritatis laboriosam atque, alias, nam sit
              labore aliquid sint perspiciatis totam nihil.
            </div>
          </main>
        </div>
        <div>
          <header class="flex gap-2">
            <Image class="w-10 h-10 rounded-full"></Image>
            <div class="text-xl font-bold">userName</div>
          </header>
          <main>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic commodi ex animi harum
              nostrum, ipsa excepturi esse blanditiis veritatis laboriosam atque, alias, nam sit
              labore aliquid sint perspiciatis totam nihil.
            </div>
          </main>
        </div>
      </div>
      <div v-if="listIndex == 2">@我的 No notifications yet!</div>
    </main>
  </MainStyle>
</template>
