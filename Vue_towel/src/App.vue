<script setup>
import Head from './views/head/Head.vue'
import Post from './views/body/post/Post.vue'
import postContent from './views/body/post/postContent.vue'
import add from './views/body/add/add.vue'
import user from './views/body/user/user.vue'

import Foot from './views/foot/Foot.vue'
</script>
<template>
  <div class="flex pt-2  ">
    <Head></Head>
    <!-- <Post></Post> -->
    <!-- <postContent></postContent> -->
    <!-- <add></add> -->
    <!-- <user></user> -->
     <div class="ml-[30%] w-[30%]">
      <RouterView></RouterView>
     </div>
    <Foot></Foot>
  </div>
</template>
<style></style>