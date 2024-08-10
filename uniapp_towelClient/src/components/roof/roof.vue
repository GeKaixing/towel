<script setup></script>
<template>
    <view class="roof">
        <slot></slot>
    </view>
</template>
<style>
.roof{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}
</style>