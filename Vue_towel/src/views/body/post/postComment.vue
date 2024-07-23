<script setup>
import postReply from './postReply.vue'
import { ref } from 'vue'
const isPostReply=ref(false)
</script>
<template>
    <div class="p-2 space-y-2 ">
        <header class="flex justify-between ">
            <div class="flex gap-2 items-center">
                <div class="h-12 w-12 rounded-full bg-gray-500"></div>
                <div class="text-lg font-bold">name</div>
            </div>
            <div class="font-bold text-2xl">...</div>
        </header>
        <mian class="pl-14">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur praesentium nam a repellendus, ipsum hic quos sed voluptatibus, iusto molestias tempore! Officiis pariatur excepturi, esse assumenda adipisci quidem dolore in.
        </mian>
        <footer class="flex justify-around ">
            <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            <div class="w-10 h-10 rounded-full bg-gray-500" @click='isPostReply=!isPostReply'>3</div>
        </footer>
        <postReply v-if="isPostReply"></postReply>
    </div>
</template>
<style></style>