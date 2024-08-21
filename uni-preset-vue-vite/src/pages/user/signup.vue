<script setup>
import pageLayout from '../../style/pagelayout.vue'
import {ref} from 'vue'
const emailData=ref('')
const isShow=ref(false)
/*显示验证码框 */
const idShowHandler=()=>{
    isShow.value=true
}
const navigateTo=()=>{
    uni.navigateTo({url:"pages/user/login"})
}
</script>
<template>
    <pageLayout>
        <view class="layout">
        <image class="logo" src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png"></image>
        <view action="" class="login">
            <input type="text" class="login-account" placeholder="account">
            <input type="poassword" class="login-password" placeholder="password">
            <input type="email" v-model="emailData" class="login-password" placeholder="email">
            <input type="text" v-if="isShow" class="login-password" maxlength="6" placeholder="验证码">
            <view v-if="emailData" class="login-submit" @click="idShowHandler">发送验证码</view>
            <view class="login-submit"> 注册</view>
            <view class="login-submit-login"  @click="navigateTo">登录</view>
        </view>
    </view>
    </pageLayout>
</template>
<style scoped>
.layout {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
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
    width: 500rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.login-account {
    width: 100%;
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
.login-submit-login{

    display: flex;
    justify-content: center;
}
</style>