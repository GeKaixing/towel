<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import PostFoot from '@/components/PostFoot.vue'
import PostHear from '@/components/PostHear.vue'
import PostInput from '@/components/PostInput.vue'
</script>

<template>
  <div class="p-2 m-2">
    <div class="mb-2">
      <BackButton></BackButton>
    </div>
    <PostHear></PostHear>
    <mian>text</mian>
    <PostFoot props="nocomment"></PostFoot>
    <div class="flex justify-center">
      <PostInput></PostInput>
    </div>
    <div class="font-bold text-xl flex justify-center">no comment</div>
  </div>
</template>
