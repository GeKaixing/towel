<script setup>
import { ref } from 'vue';
import Footer from './views/footer/footer.vue';
import Tabs from './views/header/tabs/tabs.vue';
// const islogin = ref(false)
</script>
<template>
<!--    <div v-if="islogin">
      <Tabs></Tabs>
      <div :style="{ marginLeft: '210px', marginRight: '10px', marginTop: '10px' }">
         <Footer></Footer>
         <router-view></router-view>
      </div>
   </div>
   <div v-else>
      <router-view></router-view>
   </div> -->
   <Tabs></Tabs>
      <div :style="{ marginLeft: '210px', marginRight: '10px', marginTop: '10px' }">
         <Footer></Footer>
         <router-view></router-view>
      </div>
</template>

<style scoped></style>
