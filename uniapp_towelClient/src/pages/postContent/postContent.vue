<template>
	<view class="DetailpageBox">
		<view class="Detailpage">
			<view class="head">
				<image class="headImage" :src="headimg"></image>
				<span>{{ username }}</span>
			</view>
			<view class="content">
				<span>{{ postText }}</span>
				<view class="imagebox" v-if="postImages" >
					<image class="postContentImage"  :src="postImages"></image>
				</view>
			</view>
		</view>
	</view>
	<commentVue :postID="postID"></commentVue>
</template>
<script setup>
import commentVue from "../postContent/comment/comment.vue"
import {onLoad} from "@dcloudio/uni-app"
import { ref } from 'vue'
const postID = ref(null)
const headimg=ref(null)
const username=ref(null)
const postText=ref(null)
const postImages=ref(null)
onLoad(function (options) {
	const data = JSON.parse(decodeURIComponent(options.data));
	postID.value = data._id;
	headimg.value=data.user.headimg
	username.value=data.user.username
	postText.value=data.postText
	postImages.value=data.postImages
});
</script>

<style>
page {
	background-color: #f5f5f5;
	overflow-y: auto; 
}

.DetailpageBox {
	background-color: #ffffff;
}

.Detailpage {
	width: 90%;
	margin: auto;
	margin-bottom: 16rpx;
	padding: 2rpx;
}

.head {
	display: flex;
	flex-direction: row;
	gap: 16rpx;
}

.headImage {

	background-color: aliceblue;
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;

}

.contentImage {
	width: 100%;
}
.postContentImage{
	object-fit: fill;
	width: 100%;
}
.imagebox {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}
</style>