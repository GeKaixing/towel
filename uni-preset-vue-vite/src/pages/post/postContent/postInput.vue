<script setup>
import {ref } from "vue"
</script>
<template>
<view class="input-box">
    <input class="input" placeholder="评论">
    <view class="input-button">发表</view>
</view>

</template>
<style>
.input-box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10rpx;
    width: 100%;
}
.input{
    background-color: #f6f6f6;
    height: 70rpx;
    border-radius: 10rpx;
    width: 70%;
}
.input-button{
    height: 70rpx;
    width: 15%;
    background-color: #f6f6f6;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>