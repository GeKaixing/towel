<template>
	<view class="search">
		<view class="navBar">
			<view class="navBarLeft">
				<view>
					推荐
				</view>
				<view class="moreIcon" @click="isshowDataSelectHanlder"
					:style="{ transform: isshowDataSelect ? 'rotate(-120deg)' : 'rotate(90deg)' }">
					^
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
		<form @submit="fliterHandle">
			<input v-model="fliterData" type="text" class="searchInput" placeholder="输入关键词搜索" />
			<!-- <button class='searchIcon' @click="fliterHandle"></button> -->
		</form>
		<span @click="fliterHandle" class="searchBtn">搜索</span>
	</view>
</template>
<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useHeadStore } from "../piniaStore/headStore"
const store = useHeadStore()
const { inputState } = storeToRefs(store)
const fliterData = ref(null)
watch(fliterData, () => {
	if (fliterData.value === '') {
		inputState.value = true
		store.alterFliterDataStore(null)
	} else {
		inputState.value = false
	}
})
const fliterHandle = () => {
	if (fliterData.value) {
		uni.request(
			{
				url: 'http://127.0.0.1:4000/fliterpsot',
				method: 'POST',
				data: {
					data: {
						'postText': fliterData.value
					}
				},
				success: (res) => {
					store.alterFliterDataStore(res.data)
				},
				fail: (error) => {
					console.log(error)
				}
			}
		)
	} else {
		console.log(fliterData.value)
	}

}

const isshowDataSelect = ref(false)
const isshowDataSelectHanlder = () => {
	console.log(isshowDataSelect.value);
	isshowDataSelect.value = !isshowDataSelect.value;
}
</script>
<style>
.search {
	width: 90%;
	margin-top: 16rpx;
	margin: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
}

.navBarLeft {
	display: flex;
	flex-direction: row;
	width: 240rpx;
	height: 100rpx;
	font-size: 64rpx;
	font-weight: bolder;
	background-color: #F1FAEE;
	justify-content: center;
	align-items: center;
	border-radius: 8rpx;
}

.searchInput {
	margin-left: 16rpx;
	margin-right: 14rpx;
	background-color: #F5F5F5;
	border-radius: 8rpx;
}

.searchBtn {
	font-size: 32rpx;
	font-weight: bold;
	display: flex;
	flex-direction: row;
}
</style>