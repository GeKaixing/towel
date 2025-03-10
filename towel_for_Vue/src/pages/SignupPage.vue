<script setup lang="ts">
import Button from '@/components/Button.vue'
import Image from '@/components/Image.vue'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'
const router = useRouter()
const navigateTo = (path: string) => {
  router.push(path)
}
const username = ref<string>('')
const password = ref<string>('')
const code = ref<string>('')
const email = ref<string>('')
const usenameSchema = z.string().min(0).max(6)
const passwordSchema = z.string().min(6).max(20)
const emailSchema = z.string().email()
const codeSchema = z.string().length(6)
const state=reactive<{
  username:boolean,
  password:boolean,
  email:boolean,
  code:boolean
}>({
  username:false,
  password:false,
  email:false,
  code:false
})
watch([username, email,password, code], () => {
  if(username.value){  const isUsernameValid = usenameSchema.safeParse(username.value).success
    if(!isUsernameValid){state.username=true}
  }

  if(email.value){  const isUsernameValid = passwordSchema.safeParse(username.value).success
    if(isUsernameValid){state.password=true}
  }
  if(password.value){  const isUsernameValid = emailSchema.safeParse(username.value).success
    if(isUsernameValid){state.email=true}
  }
  if(code.value){  const isUsernameValid = codeSchema.safeParse(username.value).success
    if(isUsernameValid){state.code=true}
  }
})

</script>
<template>
  <div class="flex items-center justify-center min-h-screen">
    <form class="w-100 flex gap-2 flex-col items-center" >
      <Image></Image>
      <div class="self-start flex flex-row gap-2  ">
        <div class="text-2xl self-start">账号</div>
        <div v-if="state.username" class="self-center text-red-500">账号格式错误</div>
      </div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="text" v-model="username" />
      <div class="self-start flex flex-row gap-2  ">
        <div class="text-2xl self-start">密码</div>
        <div v-if="state.password" class="self-center text-red-500">密码格式错误</div>
      </div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="password" v-model="password" />
      <div class="self-start flex flex-row gap-2  ">
        <div class="text-2xl self-start">邮箱</div>
        <div v-if="state.code" class="self-center text-red-500">验证码格式错误</div>
      </div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="email" v-model="email" />
      <div class="self-start flex flex-row gap-2  ">
        <div class="text-2xl self-start">验证码</div>
        <div v-if="state.code" class="self-center text-red-500">验证码格式错误</div>
      </div>
      <input class="w-full h-10 bg-gray-100 rounded-xl" type="text" v-model="code" />
      <Button class="self-center" @click="navigateTo('/login')" >登陆</Button>
      <Button class="self-center" @click="navigateTo('/signup')">注册</Button>
    </form>
  </div>
</template>
