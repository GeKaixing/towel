<template>
	<view class="navBar">
		<view class="navBarLeft">
			<view>
				推荐
			</view>
			<view class="moreIcon" @click="isshowDataSelectHanlder" :style="{transform:isshowDataSelect?'rotate(-90deg)':'rotate(90deg)'}">
				1
			</view>
		</view>
		<view class="dataSelect" v-if="isshowDataSelect">
			<view>
				推荐
			</view>
			<view>
				游戏
			</view>
			<view>
				动漫
			</view>
			<view>
				体育
			</view>
			<view>
				情感
			</view>
			<view>
				文学
			</view>
			<view>
				娱乐
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue';
	const isshowDataSelect = ref(false)
	const isshowDataSelectHanlder = () => {
		console.log(isshowDataSelect.value);
		isshowDataSelect.value = !isshowDataSelect.value;
	}
</script>

<style>
	.navBar {
		position: relative;
		display: flex;
		flex-direction: row;
		width:120px;
		height:64px;	
		background-color: rgba(241, 250, 238, 1);
	}
	.navBarLeft{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 32px;
		font-weight:bold;
	}

	.dataSelect {
		background-color: #ffffff;
		width: 100%;
		position: absolute;
		top: 50rpx;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10rpx;
	}

	.dataSelect>view {
		width: 100rpx;
		height: 70rpx;
		border: 1rpx solid black !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>