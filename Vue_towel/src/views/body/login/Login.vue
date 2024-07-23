<script setup>
import { ref } from 'vue'
import { login } from '@/services/Login'
import useLocaStorage from '@/hook/useLocaStorage'
const { setLocaStorageData } = useLocaStorage()
const loginData = ref({
    username: '',
    password: ''
})
const loginHandle = () => {
    loginData.value.password && loginData.value.username &&
        login(loginData.value.username, loginData.value.password).then((res) => { setLocaStorageData(res.data) })
}
</script>
<template>
    <main class="flex-1 flex flex-col rounded-lg justify-center items-center  gap-2">
        <form class="flex-1 w-full flex h-auto flex-col gap-2 justify-center items-center">
            <div class="w-1/2 flex flex-col">
                <span class="self-start">账号</span>
                <input class="h-12  bg-gray-500 rounded-lg" v-model="loginData.username">
                <span class="self-start">密码</span>
                <input class="h-12  bg-gray-500 rounded-lg" v-model="loginData.password">
            </div>
            <button class="h-12 w-1/5 bg-gray-400 rounded-lg text-xl font-bold" @click.prevent="loginHandle">登录</button>
          <RouterLink class="h-12 w-1/5 bg-gray-400 rounded-lg text-xl font-bold flex justify-center items-center" to="/signin"> 注册</RouterLink>  
        </form>
    </main>
</template>
<style></style>