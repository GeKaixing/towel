<script setup>
import { ref } from 'vue';
import {postStore}from "../../store/postStore.js"

const localStorageData = JSON.parse(uni.getStorageSync('logindata'))
const inputData = ref('')
const imageErrorRef = ref(null)
const imageData = ref('')
const deleteInputDataHandler=()=>  inputData.value = '';
const deleteImageHandler = () =>     imageData.value = '';

const chooseImageHandler = () => {
    uni.chooseImage({
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            imageData.value = tempFilePaths[0];
        }
    });
}
/* 上传图片 */
const uploadImageHandler = async () => {
    try {
        const data = await uni.uploadFile({
            url: `http://127.0.0.1:4000/upload/${localStorageData.userid}`,
            filePath: imageData.value,
            method: 'POST',
            header: {
                'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
            },
            name: 'file',
            formData: {
                "targetId": `${localStorageData.userid}`,
                "staticType": "add"
            }
        });
        return data;
    } catch (e) { console.log(e) }
}
const addAPi = async (staticUrl) => {
    try {
        const resData = await uni.request({
            url: 'http://127.0.0.1:4000/addpost',
            method: 'POST',
            header: {
                'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
            },
            data: {
                data: {
                    UserId: localStorageData.userid,
                    Image: staticUrl,
                    Text: inputData.value,
                    Share: 0,
                    Like: 0,
                    Comment: 0,
                }
            }
        });
        deleteInputDataHandler()
        deleteImageHandler()
        postStore.startReload()
        return resData;
    } catch (e) { console.log(e) }
}
/*  添加帖子*/
const addHandler = async () => {
    let resImageData;
    if (imageData.value)resImageData=await uploadImageHandler();
    const URL=imageData.value&&JSON.parse(resImageData.data).staticUrl
    const res = await addAPi(URL)
}
</script>
<template>
    <view class="add">
        <view class="post">
            <view class="post-head">
                <view class="post-image-name">
                    <image :src="localStorageData.headimg" ref="imageErrorRef" class="post-image"></image>
                    <view class="post-name">{{ localStorageData.username }}</view>
                </view>
                <view class="post-head-button">...</view>
            </view>
            <textarea v-model="inputData" class="post-input"></textarea>
            <view class="post-button">
                <view class="post-button-icon">
                    <image src="../../static/postIcon/赞.svg" mode="scaleToFill"></image>
                    <view>{{ 0 }}</view>
                </view>
                <view class="post-button-icon">
                    <image src="../../static/postIcon/评论.svg" mode="scaleToFill"></image>
                    <view>{{ 0 }}</view>
                </view>
                <view class="post-button-icon">
                    <image src="../../static/postIcon/星星.svg" mode="scaleToFill"></image>
                    <view>{{ 0 }}</view>
                </view>
                <view class="post-button-icon">
                    <image src="../../static/postIcon/分享.svg" mode="scaleToFill"></image>
                </view>
            </view>
        </view>
        <view v-if="imageData" class="post-choose-image">
            <image :src="imageData"></image>
            <view @click="deleteImageHandler">删除图片</view>
        </view>
        <image @click="chooseImageHandler" class="post-upimage" src="#"></image>
        <image @click="addHandler" class="post-add-button" src="#"></image>
    </view>
</template>
<style scoped>
.post-choose-image {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add {
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    align-items: center;
}

.post-upimage {
    width: 100rpx;
    height: 100rpx;
    background-color: black;
}

.post-add-button {
    width: 100rpx;
    height: 100rpx;
    background-color: black;
}

.post-input {
    background-color: #f6f6f6;
    width: 100%;
}

.post-context-image {
    margin: auto;
}

.post {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    border-radius: 10rpx;
    padding: 10rpx;
    border: 4rpx solid #f6f6f6;
}

.post-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.post-image-name {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10rpx;
}

.post-image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
}

.post-name {
    font-weight: bold;
}

.post-head-button {
    font-weight: bold;
}

.post-button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.post-button>view>image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    object-fit: cover;
}

.post-button-icon {
    display: flex;
    align-items: center;
}
</style>