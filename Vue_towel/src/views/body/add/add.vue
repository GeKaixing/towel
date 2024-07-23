<script setup></script>
<template>
    <main class="flex-1 flex flex-col  rounded-lg gap-6">
        <div class="flex flex-col justify-between p-2 gap-2 border-2 border-solid border-gray-500  rounded-lg">
            <header class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="h-12 w-12 bg-gray-500 rounded-full "></div>
                    <span class="text-lg font-bold">name</span>
                </div>
                <div class="font-bold text-2xl">...</div>
            </header>
            <main class="w-full ">
               <textarea class="w-full"></textarea>
            </main>
            <footer class="flex justify-around ">
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
                <div class="w-10 h-10 rounded-full bg-gray-500"></div>
            </footer>
        </div>
        <form class="self-center">
            <input type="file" id="filel" class="hidden" >
        </form>
        <label class="w-12 h-12 bg-gray-500 rounded-full self-center" for="filel"></label>
    </main>
</template>
<style></style>