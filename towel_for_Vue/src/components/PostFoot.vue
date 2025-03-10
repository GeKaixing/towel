<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
          props: String
})

</script>
<template>
  <footer class="flex flex-row justify-between">
    <!-- liked -->
     <div class="flex felx-row items-center gap-2">
      <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-10 h-10 rounded-full " alt="headimg">
      <div>12</div>
     </div>
    <!-- comment -->
    <div  v-if="!!!props.props" class="flex felx-row items-center gap-2">
      <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-10 h-10 rounded-full " alt="headimg">
      <div>12</div>
     </div>
    <!-- started -->
    <div class="flex felx-row items-center gap-2">
      <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-10 h-10 rounded-full " alt="headimg">
      <div>12</div>
     </div>
    <!-- share -->
    <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-10 h-10 rounded-full " alt="headimg">
  </footer>
</template>
