
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<template>
  <button @click="goBack" class="bg-gray-200 hover:bg-gray-400 rounded-full w-12 h-12"  >Back</button>
</template>
<style scoped>
</style>
