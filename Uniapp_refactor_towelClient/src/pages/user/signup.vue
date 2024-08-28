<script setup>
import pageLayoutStyle from "../../style/pageLayoutStyle.vue";
import { ref } from "vue";
const inputData = ref({
  name: "",
  password: "",
  email: "",
  verificationCode: "",
});
const isShow = ref(false);
const  inputDatainitialization=()=>{inputData.value={name:"",password:"",email:"",verificationCode:""}}
/*显示验证码框 */
const idShowHandler = () => {
  isShow.value = true;
  console.log(111);
  uni.request({
    url: "http://127.0.0.1:4000/nodemailerRegister",
    method: "POST",
    data: {
      data: {
        username: inputData.value.name,
        password: inputData.value.password,
        email: inputData.value.email,
      },
    },
    header: {
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
      console.log(res);
      if (res.statusCode === 201) {
        uni.showToast({
          title: "验证码已发送注意查收",
        });
      } else if (res.statusCode === 400) {
        uni.showToast({
          title: res.data.meassge,
        });
      }
    },
    fail: function (res) {
      console.log(res);
    },
  });
};
const navigateTo = () => {
  uni.navigateTo({ url: "/pages/user/login" });
};
const signupHandler = () => {
  uni.request({
    url: "http://127.0.0.1:4000/register",
    method: "POST",
    data: {
      data: {
        username: inputData.value.name,
        password: inputData.value.password,
        email: inputData.value.email,
        code: inputData.value.verificationCode,
      },
    },
    header: {
      "content-type": "application/json", // 设置请求头
    },
    success: function (res) {
      if (res.statusCode === 201) {
        uni.showToast({
          title: "注册成功",
        });
        inputDatainitialization()
        navigateTo()
      }
    },
    fail: function (res) {
      console.log(res);
    },
  });
};
</script>
<template>
  <pageLayoutStyle>
    <view class="layout">
      <image class="logo" src="../../static/logo.png"></image>
      <view action="" class="login">
        <input
          type="text"
          class="login-account"
          v-model="inputData.name"
          placeholder="账户"
        />
        <input
          type="password"
          class="login-password"
          v-model="inputData.password"
          placeholder="密码"
        />
        <input
          type="email"
          v-model="inputData.email"
          class="login-password"
          placeholder="电子邮件"
        />
        <input
          type="text"
          v-if="isShow"
          class="login-password-verification-code"
          maxlength="6"
          placeholder="验证码"
          v-model="inputData.verificationCode"
        />
        <view v-if="inputData.email" class="login-submit" @click="idShowHandler"
          >发送验证码</view
        >
        <view class="login-submit" @click="signupHandler"> 注册</view>
        <view class="login-submit-login" @click="navigateTo">登录</view>
      </view>
    </view>
  </pageLayoutStyle>
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
  width: 500rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.login-account,
.login-password-verification-code {
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
.login-submit-login {
  display: flex;
  justify-content: center;
}
</style>
