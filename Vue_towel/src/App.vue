<script setup>
import Head from './views/head/Head.vue'
import Post from './views/body/post/Post.vue'
import postContent from './views/body/post/postContent.vue'
import add from './views/body/add/add.vue'
import user from './views/body/user/user.vue'

import Foot from './views/foot/Foot.vue'
</script>
<template>
  <div class="flex gap-2 px-10 py-2">
    <Head></Head>
    <!-- <Post></Post> -->
    <!-- <postContent></postContent> -->
     <!-- <add></add> -->
      <!-- <user></user> -->
      <RouterView></RouterView>
    <Foot></Foot>
  </div>
</template>
<style></style>