<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  src: String,
  alt: String,

})
const emit = defineEmits(['click'])
const imgDom = ref()
const handleError=()=>{
  if(imgDom.value){
    imgDom.value?.setAttribute('src','https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png')
  }
}
</script>
<template>
  <img ref="imgDom" class="object-scale-down " :src="props.src || 'https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png'" @click="emit('click')" @error="handleError" :alt="props.alt"></img>
</template>
