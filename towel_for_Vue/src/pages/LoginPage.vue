<script setup lang="ts">
import Button from '@/components/Button.vue'
import Image from '@/components/Image.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router=useRouter();
const navigateTo = (path: string) => {
  router.push(path)
}
const username = ref<string>('')
const password = ref<string>('')
const handleSubmit = (event: Event) => {
  event.preventDefault()
    console.log('loging......')
  if (username.value&& password.value) {
    // Perform form submission logic here
    console.log('Form submitted successfully')
  } else {
    console.log('Form has errors')
  }
}

</script>
<template>
  <div class="flex items-center justify-center min-h-screen">
    <form class="w-100 flex gap-2 flex-col items-center" >
      <Image></Image>
      <div class=" self-start flex flex-row w-full ">
        <div class="text-2xl self-start">账号</div>
        <div  v-if="0" class="self-center text-red-500" >账号或者密码错误</div>
      </div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="text" v-model="username" />
      <div class="text-2xl self-start">密码</div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="password" v-model="password" />
      <Button class="self-center" @click="handleSubmit">登陆</Button>
      <Button class="self-center" @click="navigateTo('/signup')">注册</Button>
    </form>
  </div>
</template>
