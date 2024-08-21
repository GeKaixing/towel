<script setup>
import pageLayout from '../../style/pagelayout.vue'
import { ref } from "vue"
const name = ref('')
const password = ref('')
const loginHandelr = () => {
    if(name.value===''&&password.value===''){uni.showToast({
	title: '不要为空哦',
});return;};
    uni.request({
        url: 'http://127.0.0.1:4000/login',
        method: 'POST',
        data: {
            data: {
                'username': name.value,
                'password': password.value
            }
        },
        header: {
            'content-type': 'application/json' // 设置请求头
        },
        success: function (res) {
            console.log(res)
            uni.setStorage({
                key: 'logindata',
                data: `${JSON.stringify(res.data)}`,
            })
        },
        fail: function (res) {
            console.log(res)
        }
    })
}
</script>
<template>
    <pageLayout>
        <view class="layout">
            <image class="logo" src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"></image>
            <view action="" class="login">
                <input type="text" class="login-account" placeholder="账号" v-model="name" >
                <input type="poassword" class="login-password" placeholder="密码" v-model="password">
                <view class="login-submit" @click="loginHandelr"> 登录</view>
                <navigator class="login-submit" url="./signup"> 注册</navigator>
                <navigator class="login-submit"> 设置</navigator>
            </view>
        </view>

    </pageLayout>
</template>
<style scoped>
.layout {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.logo {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    width: 100rpx;
    height: 100rpx;
    object-fit: contain;
}

.login {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.login-account {
    width: 500rpx;
    height: 60rpx;
    background-color: #f6f6f6;
}

.login-password {
    width: 100%;
    height: 60rpx;
    background-color: #f6f6f6;
}

.login-submit {
    display: flex;
    width: 50%;
    height: 60rpx;
    align-self: center;
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
</style>