<template>
	<view class="message">
		<view class="messageOne" @click="toPushMessage()">
			<view class="messageIcon">
				<image src="../../static/Images/评论.svg"></image>
				<view>@我的</view>
			</view>
			<view class="rightShow">
				<view>
					{{ sockeData.length }}
				</view>
				<view>
					>
				</view>
			</view>
		</view>
		<view class="messageTwo">
			<view class="messageIcon">
				<image src="../../static/Images/赞.svg"></image>
				<view>点赞</view>
			</view>
			<view>></view>
		</view>
	</view>
</template>

<script setup>
import { onReady } from '@dcloudio/uni-app';
import { useSocketStore } from '../../piniaStore/socketStore';
import { storeToRefs } from 'pinia';
const { sockeData } = storeToRefs(useSocketStore())
onReady(()=>{
    uni.setNavigationBarTitle({title:'消息'})
})
const toPushMessage = () => {
	uni.navigateTo({
		url: './pushMessage/pushMessage'
	})
}
</script>
<style>
.rightShow{
	display: flex;
	flex-direction: row;
	gap: 16rpx;
	justify-content: center;
}
.message {
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 36rpx;
}

.messageOne,
.messageTwo {
	display: flex;
	justify-content: space-between;
	align-content: center;
}

.messageIcon {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.messageIcon>image {
	margin-right: 34rpx;
}

.messageOne {
	border-bottom: 10rpx;
	border-color: black;
}

image {
	width: 75rpx;
	height: 75rpx;
	border-radius: 16rpx;
}
</style>