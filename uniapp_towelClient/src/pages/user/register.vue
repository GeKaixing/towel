<script setup>
import { computed, ref, } from 'vue'
const userName = ref(null);
const userPassword = ref(null);
const email = ref(null);
const responsecode = ref(null);
const reCode = ref(null);
const isShow = ref(false);
const isShowtime = ref(true);
const time = ref(30);
/* const isShowSendCode=ref(false) */
const isShowSendCode = computed(() => {
    return (userName.value && userPassword.value && email.value && isEmail.value)
})
// 电子邮件格式的正则表达式模式
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
const isEmail = computed(() => {
    return isValidEmail(email.value);
})
const nodemailerRegister = () => {
    if(!(isShowtime.value))return;
    uni.request({
        url: 'http://127.0.0.1:4000/nodemailerRegister',
        method: 'POST',
        data: {
            data: {
                username: userName.value,
                password: userPassword.value,
                email: email.value
            }
        },
        success: (res) => {
            responsecode.value = res.data.message;
            isShow.value = true;
            console.log(res.data);
            setTimeout(() => {
                responsecode.value = null
            }, 2500)
            //倒计时
            isShowtime.value=false
            const countDown = () => {
                time.value--;
                if (time.value === 0) {
                    time.value=30;
                    clearInterval(timeDown);
                    isShowtime.value=true;
                }
            }
            const timeDown = setInterval(countDown, 1000)

        },
        fail: () => {
            console.log('fail');
        }
    })
}
//注册
const register = () => {
    if (!((isShowSendCode.value) && isShow.value && reCode.value)) return;
    uni.request({
        url: 'http://127.0.0.1:4000/register',
        method: 'POST',
        data: {
            data: {
                username: userName.value,
                password: userPassword.value,
                email: email.value,
                code: reCode.value,
            }
        },
        success: (res) => {
            if (res.data.status) {
                console.log('注册成功')
                responsecode.value = "注册成功,2秒后返回登录页面"
                console.log('2秒后返回登录页面')
                setTimeout(() => {
                    responsecode.value = null
                    uni.navigateBack()
                }, 2000)
                userName.value = null;
                userPassword.value = null;
                email.value = null;
                reCode.value = null;
            } else {
                console.log(res.data.meassge)
                console.log('注册失败')

            }
        },
        fail: () => {
            console.log('fail');
        }
    })
}


</script>
<template>
    <!-- this is register page -->
    <view class="regsterInput">
        <view>
            <span>用户名</span>
            <input type='text' class="username" v-model="userName" />
        </view>
        <view>
            <span>密码</span>
            <input type="password" class="userpassword" v-model="userPassword" />
        </view>
        <view>
            <span>邮箱</span>
            <input type="text" class="email" v-model="email" />
        </view>

        <view v-if="isShow">
            <span>验证码</span>
            <input type="text" class="code" v-model="reCode" />
        </view>

        <button @click="nodemailerRegister" v-if="isShowSendCode" class="nodemailerRegister">
            <span v-if="isShowtime">
                发送验证码
            </span>
            <span v-else>
                {{ time }}
            </span>
        </button>
        <button @click="register" class="register">
            注册
        </button>
    </view>
    <view v-if="responsecode" class="responsecode">
        {{ responsecode.value }}
    </view>
</template>
<style>
.nodemailerRegister{
    margin-top: 24rpx;
}
.responsecode {
    width: 90%;
    margin: auto;
    text-align: center;
}

.regsterInput {
    width: 90%;
    margin: auto;
    margin-top: 48rpx;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.regsterInput>view {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 8rpx;
}

.regsterInput>view>span {
    display: inline-block;
    white-space: nowrap;
}

.regsterInput>button {
    width: 100%;
    height: 100rpx;
    background-color: rgb(225, 219, 255);

}

.username,
.userpassword,
.email,
.code {
    height: 100rpx;
    width: 100%;
    background-color: rgb(225, 219, 255);
}
.register{
margin-top: 24rpx;
}
</style>