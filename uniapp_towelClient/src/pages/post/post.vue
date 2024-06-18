<template>
	<postUserSelect v-if="userSelect" @child-click='userSelectHandlerEmit' :saveUserDataProps="saveUserData"
		type='post'></postUserSelect>
	<view v-for="(item, index) in fliterData" class="post" :key='index'>
		<view class="box" @click="toDetailPage(item)">
			<view class="head">
				<view class="headAndusername">
					<image class="headPortrait" :src='item.user.headimg'></image>
					<view>{{ item.user.username }}</view>
				</view>
				<view @click.stop="userSelectHandler(item.user.username, item._id)">...</view>
			</view>
			<view class="content">
				<span>{{ item.postText }}</span>
				<view class="imagebox">
					<image class="text" v-for=' items of item.postImages' :src="items.staticUrl"></image>
				</view>
			</view>
			<view class="foot">
				<view>
					<check-one theme="outline" size="24" fill="#536371"/>
					<image class="share" src="../../static/logo.png"></image>
					<span class='shateNumber'>{{ item.postShare }}</span>
				</view>
				<view>
					<image class="comment" src="../../static/logo.png"></image>
					<span class='commentNumber'>{{ item.postComment }}</span>

				</view>
				<view @click.stop="likehandler(item._id)">
					<image class="like" src="../../static/logo.png"></image>
					<span class='likeNumber'>{{ item.postLike }}</span>
				</view>
			</view>
		</view>
	</view>
	<view class="hint" v-if="likeState">动作重复了</view>
</template>
<script setup>
import '@icon-park/vue-next/styles/index.css';
import {CheckOne} from '@icon-park/vue-next'
import { usePostStore } from '../piniaStore/postStore';
import { ref, onMounted, computed, watch } from "vue";
import { useHeadStore } from '../piniaStore/headStore.js'
import { storeToRefs } from 'pinia'
import { useCommentReplyInputStore } from '../piniaStore/comment_reply_input.js'
import postUserSelect from "./postUserSelect/postUserSelect.vue";
import { useloginStore } from '../piniaStore/loginStore.js'
import { onLoad, onShow } from '@dcloudio/uni-app';
import {useSocketStore}from '../piniaStore/socketStore'
const headStore = useHeadStore()
const loginStore = useloginStore()
const postStore = usePostStore()
const { fliterDataStore, inputState } = storeToRefs(headStore)
const { result } = storeToRefs(postStore)
const { loginState } = storeToRefs(loginStore)
const CommentReplyInputStore = useCommentReplyInputStore()
const { ResponseCommentData, ResponseReplyData } = storeToRefs(CommentReplyInputStore)
const likeState = ref(false),
	//userSelect,控制用户选择显示逻辑，boolean
	userSelect = ref(false),
	saveUserData = ref({ userName: '', Id: '' });
//进入页面就加载socket.io
onMounted(()=>{
	useSocketStore().connect()
})
const userSelectHandler = (userName, postId) => {
	saveUserData.value.userName = userName;
	saveUserData.value.Id = postId;
	userSelect.value = !userSelect.value
}
const userSelectHandlerEmit = (value) => {
	userSelect.value = value
}
//三元运算符
//inputState为输入框状态，为true，则显示result，否则显示fliterDataStore
const fliterData = computed(() => {
	//bug 分析用于用户点击查看直接的发的帖子，但是它点击首页不会切换状态
	return inputState.value ? result.value : fliterDataStore.value
})
onShow(()=>{
	//查看当前路由
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	if (page.route == 'pages/index/index') {
		//true 说明在首页
		postStore.postUniRequst()
	} else if (page.route == 'pages/user/user') {
		// 在user页
		usePostStore().userMessagePost()
	}
})
//监听用户登录或者登出状态
watch(loginState, () => {
	postStore.postUniRequst()
})
const Status = function (status_code) {
	if (status_code === 400) {
		likeState.value = true
		setTimeout(() => {
			likeState.value = false
		}, 1000)
	}
}
const toDetailPage = (values) => {
	const data = encodeURIComponent(JSON.stringify(values))
	ResponseCommentData.value = true;
	ResponseReplyData.value = true;
	uni.navigateTo({
		url: `/pages/DetailPage/DetailPage?data=${data}`
	})
}
const likehandler = (_id) => {
	uni.request({
		url: `http://127.0.0.1:4000/post/like/${_id}`,
		method: 'POST',
		data: {
			data: {
				userId: `${uni.getStorageSync('userid')}`
			}
		},
		header: {
			'token': uni.getStorageSync('jwt'),
		},
		success: (res) => {
			if (res.statusCode === 201) {
				const index = result.value.findIndex(item => item._id === _id)
				if (index !== -1) {
					result.value[index].postLike = res.data.likenum
				} else {
					Status(res.statusCode);
				}
			}
			Status(res.statusCode)
		},
		fail: (error) => {
			console.log(error)
		}
	})
}
</script>

<style>
.hint {
	pointer-events: none;
	background-color: red;
	font-size: 50rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.imagebox {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20rpx;
}

.text {
	object-fit: cover;
	width: 200rpx;
	height: 300rpx;
}

.post {
	display: flex;
	flex-direction: column;

}

view {
	color: black;
}

image {
	width: auto;
	height: auto;
}

.box {
	padding-top: 10rpx;
	position: relative;
	overflow: hidden;
	border-radius: 16rpx;
	width: 90%;
	height: auto;
	margin: auto;
	margin-bottom: 16rpx;
	border: 1px solid #F5F5F5;
}

.head {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.headAndusername {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.headPortrait {
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
	background-color: aliceblue;
	margin-right: 16rpx;
}

.foot {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	flex-grow: 1;

}

.foot view {
	display: flex;
	flex-direction: row;
	gap: 10rpx;

}

.share,
.comment,
.like {
	width: 50rpx;
	height: 50rpx;
	position: relative;
}

.content {
	display: flex;
	flex-direction: column;
	height: auto;
}
</style>