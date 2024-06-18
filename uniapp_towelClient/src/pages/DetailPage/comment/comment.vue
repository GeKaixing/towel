<template>
	<postUserSelect v-if="showSelect"  @child-click='userSelectHandlerEmit' :saveUserDataProps="saveUserData" type='comment'></postUserSelect>
	<view class="commentBox">
		<view class="commentFont" v-if="ResponseCommentData">评论</view>
		<view class="comment" v-for="item in commentData">
			<view class="userComment">
				<view class="userImage">
					<image :src="item.users[0].headimg"></image>
					<view @click="store.atHandler(item,item.users[0].username)">{{ item.users[0].username }}</view>
				</view>
				<view class="commentLike">
					<view @click='showSelectHandler(item.users[0].username,item._id)'>...</view>
					<view @click="likehandler(item._id)"  class="commentLikeBox">
						<image class='commentLikeIcon' src="../../../static/logo.png"></image>
						<view class="commentLikeNumber">{{ item.commentLike }}</view>
					</view>
				</view>
			</view>
			<view class="commentContent">
				<span>{{ item.commentText }}</span>
				<image v-if='item.commentImages' :src="item.commentImages" class="commentImage"></image>
				<replyVue :commentID="item._id"></replyVue>
			</view>
		</view>
		<view class="viewMoreOnComment" v-if="(commentData.length)">总共{{ commentData.length }}条评论</view>
		<view class="viewMoreOnComment" v-else>还没有精彩评论,快来发言吧！</view>
	</view>
	<view class="hint" v-if="likeState">动作重复了</view>
	<view class="hint" v-if="inputisnull">内容为空</view>
	<!-- 评论框 -->
	<view class="commentInput" v-if="ResponseCommentData">
		<view class='showImage' v-if="showImage">
			<view class="chooseImages">
				<view @click="selChooseImage">x</view>
				<image :src="image" class="chooseImage" mode="aspectFit"></image>
			</view>
		</view>
		<!-- if判断在什么页面，控制显示逻辑 -->
		<view class="commentInpuBox" v-if="ResponseCommentData">
			<input class="commentInput_Input" type="text" v-model="commentInput" placeholder="说说你的看法" />
			<!-- 三元运算判断发送什么，使用什么函数 -->
			<!-- store.sendReply 发送回复  -->
			<!-- sendComment 发送评论 -->
			<view class="submitButton" type="submit"
				@click="isShow ? store.sendReply(commentInput, props.postID) : sendComment()">发送
			</view>	
			<view class="sendSImage" @click="sendIMage">图片</view>
		</view>
	</view>
</template>
<script setup>
import postUserSelect from '../../post/postUserSelect/postUserSelect.vue';
import { onMounted, ref, watch, computed } from 'vue';
import replyVue from './reply/reply.vue'
import { storeToRefs } from 'pinia'
import { onShow } from '@dcloudio/uni-app';
import { useCommentReplyInputStore } from '../../piniaStore/comment_reply_input'
const store = useCommentReplyInputStore()
	, { atName, commentInput, isShow,ResponseCommentData,commentData} = storeToRefs(store)
	, props = defineProps(['postID'])
	, likeState = ref(false)
	, inputisnull = ref(false)
	, image = ref(null)
	, responseStaticUrl = ref(null)
	, showSelect=ref(false)
	, saveUserData=ref({userName:'',Id:''});
	
/* 
* 控制是否显示用户选择框的现实的函数
*/
const showSelectHandler=(userName,commentId)=>{
	saveUserData.value.userName=userName;
	saveUserData.value.Id=commentId;
	showSelect.value=!showSelect.value
}
//往父组件传递的函数，并接受参数value
const userSelectHandlerEmit = (value) => {
	showSelect.value =value
}
/* 
* 调用reuserequest（）获取根据postId查询的数据
* 当userResponseCommentData有数据的时候就不需要调用reuserequest（）函数，说明用户在查看自己发布的评论，这调用根据用户查询返回的数据
*/
onMounted(() => {//查看当前路由
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	 if(page.route=='pages/user/user'){
		useCommentReplyInputStore().userRequstComment()
	 }else {
		reuserequest()
	 }/* 
	console.log(ResponseCommentData.value)
	if (!(ResponseCommentData.value)) {
		console.log('execute comment 1')
		reuserequest()
	}
	console.log('execute comment 2') */
})
//选择图片逻辑
const showImage = computed(() => {
	return (image.value ? true : false)
})
//删除图片函数
const selChooseImage = () => {
	image.value = null;
}
//发送图片函数
const sendIMage = () => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			const tempFilePaths = chooseImageRes.tempFilePaths;
			image.value = tempFilePaths[0];
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
					"targetId": `${props.postID}`,
					"staticType": "comment"
				},
				success: (res) => {
					responseStaticUrl.value = JSON.parse(res.data).staticUrl
				}
			});
		}
	});
}
//监听atname改变触发评论框输入框
watch(atName, () => {
	commentInput.value = `@${atName.value}:`
})
/**
 * 监听 commentInput 的变化。
 * 当 commentInput 的值为空字符串时，隐藏评论输入框。
 */
watch(commentInput, () => {
	if (commentInput.value === '') {
		isShow.value = false
	}
})
var pages = getCurrentPages();
var page = pages[pages.length - 1].route;
page === "pages/DetailPage/DetailPage" ? commentInput.value : commentInput.value = '';
/* reuserequest 复用代码
* 可以更近一步封装
*/
const reuserequest = () => {
	uni.request({
		url: `http://127.0.0.1:4000/comment/${props.postID}`,
		header: {
			'token': uni.getStorageSync('jwt'),
		},
		success: (res) => {
			commentData.value = res.data;
			ResponseCommentData.value = true;
		},
		fail: (error) => {
			console.log(error)
		}
	})
}

const Status = function (status_code) {
	if (status_code === 400) {
		likeState.value = true
		setTimeout(() => {
			likeState.value = false
		}, 1000)
	}
}
const likehandler = (_id) => {
	uni.request({
		url: `http://127.0.0.1:4000/comments/like/${_id}`,
		method: 'POST',
		header: {
			'token': uni.getStorageSync('jwt'),
		},
		data: {
			data: {
				userId: `${uni.getStorageSync('userid')}`
			}
		},
		success: (res) => {
			if (res.statusCode === 201) {
				const index = commentData.value.findIndex(item => item._id === _id)
				if (index !== -1) {
					commentData.value[index].commentLike = res.data.likenum
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
const sendComment = () => {
	if (!commentInput.value) {
		inputisnull.value = true;
		setTimeout(() => {
			inputisnull.value = false
		}, 1000)
	} else {
		uni.request({
			url: `http://127.0.0.1:4000/addcomment/${props.postID}`,
			method: 'POST',
			header: {
				'token': uni.getStorageSync('jwt'),
			},
			data: {
				data: {
					commentUserId: `${uni.getStorageSync('userid')}`,
					Text: commentInput.value,
					Image: responseStaticUrl.value,
					Like: 0,
				}
			},
			success: (res) => {
				commentInput.value = ''
				image.value = null;
				reuserequest()
				//滚动到最新评论处
			},
			fail: (error) => {
				console.log(error)
			}
		})
	}
}
</script>

<style>
.commentFont {
	width: 90%;
	margin: auto;
	height: auto;
}

.chooseImage {
	width: 100rpx;
	height: 120rpx;
}

.showImage {
	width: 90%;
	margin: auto;
	position: absolute;
	z-index: 9999;
	bottom: 100rpx;
}

.sendSImage {
	height: 75rpx;
	background-color: aqua;
	width: 10%;
	border-radius: 16rpx;
}

.commentInput {
	position: fixed;
	left: 50%;
	bottom: 0;
	transform: translate(-50%);
	width: 100%;
	height: 100rpx;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
}

.commentInpuBox {
	width: 90%;
	display: flex;
	flex-direction: row;
	gap: 40rpx;
}

.commentInput_Input {
	background-color: beige;
	border-radius: 16rpx;
	width: 90%;
	height: 75rpx;
	margin: 0 auto;
}

.submitButton {
	background-color: rgb(225, 219, 255);
	height: 75rpx;
	width: 10%;
	border-radius: 16rpx;
	font-size: 34rpx;
	text-align: center;
}

.hint {
	pointer-events: none;
	background-color: red;
	font-size: 50rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.viewMoreOnComment {
	width: 100%;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16rpx;
	font-weight: lighter;
	font-size: 35rpx;
}

.commentBox {
	background-color: #ffffff;
	width: 100%;
}

.comment {
	width: 90%;
	margin: auto;
	height: auto;
	padding-bottom: 10rpx;
	display: flex;
	flex-direction: column;
}

.userComment {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.userImage {
	display: flex;
	gap: 16rpx;
	flex-direction: row;
}

.userImage>image {
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
}

.commentLikeIcon {
	width: 40rpx;
	height: 40rpx;
}

.commentLike {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.commentLikeBox{
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.commentLikeNumber {
	font-size: 35rpx;
}

.commentContent {
	display: flex;
	flex-direction: column;
	height: auto;
	width: 100%;
}

.commentImage {
	width: 100%;
}
</style>