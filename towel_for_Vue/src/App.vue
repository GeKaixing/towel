<script setup lang="ts">
import NavView from './views/NavView.vue'
import FooterView from './views/FooterView.vue'
import Add from './components/Add.vue'
</script>

<template>
  <Add></Add>
  <div class="flex items-center justify-center">
    <div class="w-[200px]">
      <NavView></NavView>
    </div>
    <div class="w-[800px] h-screen">
      <router-view></router-view>
    </div>
    <div class="w-[100px]">
      <FooterView></FooterView>
    </div>
  </div>
</template>
<style scoped></style>
