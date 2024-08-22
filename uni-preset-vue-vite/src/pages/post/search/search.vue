<script setup>
import { ref } from "vue"
const inputData = ref('')
const emit=defineEmits(['searchDataHandler'])
const searcHandler = () => {
    uni.request({
        url: 'http://127.0.0.1:4000/fliterpsot',
        header: {
            'content-type': 'application/json' // 设置请求头
        },
        method: 'POST',
        data: {
            data: {
                postText: inputData.value
            }
        }, success: function (res) {
            emit('searchDataHandler',res.data,inputData) 
        },
        fail: function (res) {
            console.log(res)
        }
    })
}
</script>
<template>
    <view class='search'>
        <input class="input-search" v-model='inputData'>
        <view class="input-button" @click="searcHandler">搜索</view>
    </view>
</template>
<style>
.search {
    display: flex;
    justify-content: space-between;
    gap: 10rpx;
    align-items: center;
}

.input-search {
    border-radius: 10rpx;
    background-color: #f6f6f6;
    margin-bottom: 10rpx;
    flex-grow: 30;
    height: 50rpx;
}

.input-button {
    flex-grow: 1;
    font-weight: bold;
    height: 50rpx;
}
</style>