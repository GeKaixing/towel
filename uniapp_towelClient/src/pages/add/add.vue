<script setup>
/* 
微信小程序指只能一次只能上传一张图片。
*/
import { computed, onMounted, ref,onBeforeMount, watch } from 'vue';
import { usePostStore } from '../piniaStore/postStore';
import { useloginStore } from '../piniaStore/loginStore';
import { storeToRefs } from 'pinia'
const text = ref('');
const image = ref('');
const loginStore = useloginStore()
const {loginState}=storeToRefs(loginStore)
const postStore = usePostStore()
console.log(loginState.value)
onBeforeMount(()=>{
    if(!loginState.value){
        loginState.value=uni.getStorageSync('jwt')
    }
})
const add = () => {
    console.log(image.value)
    if (!((text.value) || (image.value))) return null;
    uni.request({
        url: 'http://127.0.0.1:4000/addpost',
        method: 'POST',
        header: {
            'token': uni.getStorageSync('jwt'),
        },
        data: {
            data: {
                UserId: uni.getStorageSync('userid'),
                Image: '',
                Text: text.value,
                Share: 0,
                Like: 0,
                Comment: 0,
            }
        },
        success: (res) => {
            uni.uploadFile({
                url: `http://127.0.0.1:4000/upload/${uni.getStorageSync('userid')}`,
                filePath: image.value,
                method: 'POST',
                header: {
                    'token': uni.getStorageSync('jwt'),
                    'Content-Type': 'multipart/form-data', // Or any other required headers
                },
                name: 'file',
                formData: {
                    "targetId": `${res.data._id}`,
                    "staticType": "post"
                },
                success: (res) => {

                    console.log(res.data)
                    text.value = '';
                    image.value = ''
                    postStore.postUniRequst()
                }
            });
            ;
        },
        fail: (err) => {
            console.log(err);
        }
    });
}
const chooseImage = () => {
    uni.chooseImage({
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            image.value = tempFilePaths[0];
        }
    });
}
const dleImage = () => {
    image.value = '';
    console.log('execute')
}
</script>
<template>
    <view class="addBox" v-if="loginState">
        <textarea v-model="text" class="inputText" />
        <view>
            <view class="imageBox" v-if="image">
                <view @click="dleImage" class='dleImage'>x</view>
                <image :src="image" class="sendImage"></image>
            </view>
        </view>
        <view class="bottomBox">
            <image @click="chooseImage" class="addImage" src="/static/Images/图片添加.svg"></image>
            <image class="add" @click="add" src="/static/Images/添加.svg"></image>
        </view>
    </view>
    <view v-else>
        <view>
            请先登录
        </view>
    </view>
</template>
<style>
.addBox {
    width: 90%;
    margin: auto;
    margin-top: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16rpx;
}
.inputText {
    width: 100%;
    height: 300rpx;
    background-color: blanchedalmond;
}

.bottomBox {
    display: flex;
    flex-direction: row;
    gap: 16rpx;
}

.addImage {
    width: 100rpx;
    height: 100rpx;
    background-size:cover
}

.add {
    width: 100rpx;
    height: 100rpx;
    background-size:cover
}

.sendImage {
    width: 100rpx;
    height: 120rpx;
}

.imageBox {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 16rpx;
}

.dleImage {
    width: 50rpx;
    height: 50rpx;
    background-color: beige;
    border-radius: 50%;
    position: absolute;
    left: 90rpx;
    top: -27rpx;
    pointer-events:auto;
}
</style>