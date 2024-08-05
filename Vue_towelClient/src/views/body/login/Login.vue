<script setup>
import { ref } from 'vue'
import { postLogin } from '../../../services/login/login'
import useLocaStorage from '@/hook/useLocaStorage'
const { setLocaStorageData } = useLocaStorage()
const loginData = ref({
    username: '',
    password: ''
})
const loginHandle = () => {
    loginData.value.password && loginData.value.username &&
    postLogin({data:{username:loginData.value.username, password:loginData.value.password}}).then((res) => { setLocaStorageData(res.data) }) 
}
</script>
<template>
    <main class="flex-1 flex flex-col rounded-lg justify-center items-center  gap-2">
        <form class=" w-full flex h-auto flex-col gap-2 justify-center items-center">
            <div class="w-full flex flex-col">
                <span class="self-start">账号</span>
                <input class="h-12  bg-gray-500 rounded-lg w-full"  v-model="loginData.username">
                <span class="self-start">密码</span>
                <input class="h-12  bg-gray-500 rounded-lg w-full" v-model="loginData.password">
            </div>
            <button class="h-12 w-full bg-gray-400 rounded-lg text-xl font-bold" @click.prevent="loginHandle">登录</button>
          <RouterLink class="h-12 w-full bg-gray-400 rounded-lg text-xl font-bold flex justify-center items-center" to="/signin"> 注册</RouterLink>  
        </form>
    </main>
</template>
<style></style>