<script setup>
import Footer from './views/footer/footer.vue';
import Tabs from './views/header/tabs/tabs.vue';
</script>
<template >
   <Tabs></Tabs> 
   <div :style="{ marginLeft: '210px',marginRight: '10px' ,marginTop: '10px' }"> 
    <Footer></Footer>
    <router-view></router-view>
   </div>
</template>

<style scoped>
</style>
