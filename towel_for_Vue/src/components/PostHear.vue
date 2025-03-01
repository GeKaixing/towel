<script setup lang="ts">
const test = 'hello world'
</script>
<template>
<header class="flex flex-row items-center justify-between gap-2">
  <div class="flex flex-row items-center gap-2">
    <!-- headImge -->
    <img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png" class="w-15 h-15 rounded-full " alt="headimg">
    <!-- usename -->
    <div class="font-blod ">{{test}}</div>
    <!-- Date -->
    <div class="text-gray-400">{{'09-07 00:16' }}</div>
  </div>

</header>
</template>
