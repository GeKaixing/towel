<template>
	<view v-if="loginState">
		<view class="user">
			<view class="headImage">
				<image :src="headimg" class="userHeadImage">
				</image>
				<view class="userName">{{ username }}</view>
			</view>
			<button class="outlogin" @click="outLoginHandler">退出登录</button>
		</view>
		<view class="userMesssage">
			<view class="userMesssageHead" @click="chooseUserMassageBar">
				<view id="userPost">post</view>
				<view id="userComment">comment</view>
				<view id="userReply" @click="()=>ResponseReplyData=false">reply</view>
			</view>
		</view>
		<usePost v-if="chooseUserMassageBarState.userPost"></usePost>
		<UseComment v-else-if="chooseUserMassageBarState.userComment"></UseComment>
		<useReply v-else-if="chooseUserMassageBarState.userReply"></useReply>
	</view>
	<view v-else class="loginform">
		<image src="../../static/logo.png" class="logo"></image>
		<input type="text" class="inputtext" placeholder="用户名" v-model="loginName" />
		<input type="password" class="inputpassword" placeholder="密码" v-model="loginPassword" />
		<button type="submit" class="inputsubmit" @click="loginHandelr">登录</button>
		<button class='register' @click="navigateTo">注册</button>
		<view v-if="login">账号或者密码错误</view>
		<span>登录后，体验更多精彩功能</span>
	</view>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import usePost from './usePost/usePost.vue'
import UseComment from './useComment/useComment.vue';
import { useCommentReplyInputStore } from '../../piniaStore/comment_reply_input';
import useReply from './useReply/useReply.vue';
import { storeToRefs } from 'pinia'
import {useloginStore} from '../../piniaStore/loginStore'
import { onReady } from '@dcloudio/uni-app';
import loginJSON from '../../static/json/login.json'
onReady(()=>{
    uni.setNavigationBarTitle({title:'我的'})
})
const login = ref(null)
	, loginName = ref('text')
	, loginPassword = ref("text")
	, jwt = ref(null)
	, username = ref(null)
	, headimg = ref(uni.getStorageSync('headimg'))
	, chooseUserMassageBarState = ref({
		userReply: null,
		userComment: null,
		userPost: 1,
	})
	, useCommentReplyInputStores = useCommentReplyInputStore()
	, { ResponseReplyData } = storeToRefs(useCommentReplyInputStores)
	,useloginStores=useloginStore()
	,{loginState}=storeToRefs(useloginStores)
const chooseUserMassageBar = (e) => {
	switch (e.target.id) {
		case 'userReply':
			chooseUserMassageBarState.value.userReply = 1,
				chooseUserMassageBarState.value.userComment = null,
				chooseUserMassageBarState.value.userPost = null;
			break;
		case 'userComment':
			chooseUserMassageBarState.value.userReply = null,
				chooseUserMassageBarState.value.userComment = 1,
				chooseUserMassageBarState.value.userPost = null;
			break;
		case 'userPost':
			chooseUserMassageBarState.value.userReply = null,
				chooseUserMassageBarState.value.userComment = null,
				chooseUserMassageBarState.value.userPost = 1;
			break;
		default:
			chooseUserMassageBarState.value.userPost = 1;
			break;
	}
}

//init
onMounted(() => {
	const jwt = uni.getStorageSync('jwt')
	const userNameResult = uni.getStorageSync('username')
	if (jwt) {
		loginState.value = true;
		username.value = userNameResult
	}
})
const navigateTo = () => {
	console.log('touch off')
	uni.navigateTo({ url: './register' })
}
const loginStateHandler = (targer = false) => {
	uni.setStorage({
		key: 'loginstate',
		data: targer,
	})
	uni.getStorage({
		key: 'loginstate',
		success: function (res) {
			loginState.value = res.data
		}
	});
}
const loginHandelr = () => {
	
/* 	uni.setStorageSync('testdata',loginJSON)
	uni.getStorageSync('testdata') */
	 
	uni.request({
		url: 'http://127.0.0.1:4000/login',
		method: 'POST',
		data: {
			data: {
				'username': loginName.value,
				'password': loginPassword.value
			}
		},
		header: {
			'content-type': 'application/json' // 设置请求头
		},
		success: function (res) {
			if (!(res.statusCode === 400)) {
				uni.setStorage({
					key: 'jwt',
					data: `${res.data.jwt}`,
				})
				uni.setStorage({
					key: 'username',
					data: `${loginName.value}`,
				})
				uni.setStorage({
					key: 'userid',
					data: `${res.data.userid}`,
				})
				uni.setStorage({
					key: 'headimg',
					data: `${res.data.headimg}`,
				})
				uni.getStorage({
					key: 'username',
					success: function (res) {
						username.value = res.data
					}
				});
				headimg.value = res.data.headimg
				jwt.value = res.data.jwt
				loginName.value = ''
				loginPassword.value = ''
				loginStateHandler(true)
				uni.removeStorageSync('login');
				loginState.value=true;
			} else {
				uni.setStorage({
					key: 'login',
					data: true,
				})
				login.value = uni.getStorageSync('login')
				setTimeout(() => {
					login.value = false
				}, 5000)
			}
		},
		fail: function (res) {
			console.log(res)
		}
	}) 

}
const outLoginHandler = () => {
	username.value = '尚未登录'
	uni.removeStorageSync('headimg');
	uni.removeStorageSync('username');
	uni.removeStorageSync('jwt');
	uni.removeStorageSync('userid');
	uni.setStorage({
		key: 'login',
		data: false,
	})
	login.value = uni.getStorageSync('login')
	loginStateHandler()
	loginState.value=false;
}
</script>

<style>
.logo{
	width: 100rpx;
	height: 100rpx;
}
.userMesssageHead {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
}

.userMesssage {
	width: 90%;
	margin: auto;
	display: flex;
}

.loginTips {
	margin: auto;
	margin-top: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100rpx;
	width: 90%;
}

.loginform {
	margin: auto;
	margin-top: 200rpx;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30rpx;
}

.inputsubmit,
.inputtext,
.inputpassword,
.register {
	height: 100rpx;
	width: 100%;
	background-color: rgb(225, 219, 255);
}


.user {
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: row;
	align-items: space-evenly;
	justify-content: space-evenly;

}

.headImage {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20rpx;
	border-radius: 50%;
	margin-right: 34rpx;
}

.userHeadImage {
	border-radius: 50%;
	width: 75rpx;
	height: 75rpx;
}
</style>