<script setup>
import { onMounted } from 'vue';
import post from '../../post/post.vue'; 
import { usePostStore } from '../../piniaStore/postStore';
/* onMounted(()=>{
    usePostStore().userMessagePost()
}) */
</script>
<template>
    <post></post>
</template>
<style></style>