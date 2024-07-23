<script setup>
import { ref } from 'vue'
const menu = ref([
    { title: '明亮' ,url:'/setting/right'},
    { title: '暗黑' ,url:'/setting/drak'},
    { title: '跟随系统',url:'/setting/system' },
    { title: '忘记密码',url:'/setting/forgetpassword' },
    { title: '我的信息' ,url:'/setting/userinfo'},
    { title: '修改密码',url:'/setting/changepassword' },

])
</script>
<template>
    <main class="
    drfcd flex  rounded-lg  ">
        <div class="w-full flex  flex-col gap-2">
            <RouterLink v-for="(item, index) in menu " :key="index"
                :to="item.url"
                class=" h-12 bg-gray-500 rounded-lg flex justify-center items-center">
                {{ item.title }}
            </RouterLink>
        </div>
        <RouterView></RouterView>
    </main>
</template>
<style></style>