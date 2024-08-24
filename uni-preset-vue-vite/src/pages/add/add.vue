<script setup>
import { ref } from 'vue';
const localStorageData = JSON.parse(uni.getStorageSync('logindata'))
const inputData=ref(null)
const imageErrorRef=ref(null)
const imageData=ref(null)
const chooseImageHandler=()=>{
    uni.chooseImage({
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            imageData.value = tempFilePaths[0];
        }
    });
}      
/* 上传图片 */
const uploadImageHandler= ()=>{
       uni.uploadFile({
                url: `http://127.0.0.1:4000/upload/${localStorageData.userid}`,
                filePath: imageData.value,
                method: 'POST',
                header: {
                   'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
                    'Content-Type': 'multipart/form-data', // 设置请求头
                },
                name: 'file',
                formData: {
                    "targetId": `${localStorageData.userid}`,
                    "staticType": "add"
                },
                success: (res) => {
                    console.log(res.data)
                    text.value = '';
                    image.value = ''
                }
            });
}
/*  添加帖子*/
const addHandler = () => {
    uploadImageHandler()
   /*  uni.request({
        url: 'http://127.0.0.1:4000/addpost',
        method: 'POST',
        header: {
            'Authorization': `Bearer ${localStorageData?.jwt}`, // 设置jwt
        },
        data: {
            data: {
                UserId: localStorageData.userid,
                Image: '',
                Text: inputData.value,
                Share: 0,
                Like: 0,
                Comment: 0,
            }
        },
        success: (res) => {
   
            ;
        },
        fail: (err) => {
            console.log(err);
        }
    }); */
}
</script>
<template>
    <view class="add">
        <view class="post">
            <view class="post-head">
                <view class="post-image-name">
                    <image :src="localStorageData.headimg"
                        ref="imageErrorRef"
                        class="post-image"></image>
                    <view class="post-name">{{ localStorageData.username }}</view>
                </view>
                <view class="post-head-button">...</view>
            </view>
            <textarea v-model="inputData" class="post-input"></textarea>
            <view class="post-button">
                <view class="post-button-icon">
                    <image src="../../static/postIcon/赞.svg" mode="scaleToFill"></image>
                    <view>{{0}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../../static/postIcon/评论.svg" mode="scaleToFill"></image>
                    <view>{{0}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../../static/postIcon/星星.svg" mode="scaleToFill"></image>
                    <view>{{0}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../../static/postIcon/分享.svg" mode="scaleToFill"></image>
                </view>
            </view>
        </view> 
        <image @click="chooseImageHandler" class="post-upimage" src="#"></image>
        <image  @click="addHandler" class="post-add-button" src="#"></image>
    </view>
</template>
<style scoped>
.add{
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    align-items: center;
}
.post-upimage{
    width: 100rpx;
    height: 100rpx;
    background-color: black;
}
.post-add-button{
    width: 100rpx;
    height: 100rpx;
    background-color: black;
}
.post-input{
    background-color: #f6f6f6;
    width: 100%;
}
.post-context-image{
    margin: auto ;
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
.post-button-icon{
    display: flex;
    align-items: center;
}
</style>