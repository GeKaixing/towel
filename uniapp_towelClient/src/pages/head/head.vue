<template>
	<view class="search">
		<form @submit="fliterHandle" class="searchInput"  >
			<input v-model="fliterData" type="text" placeholder="输入关键词搜索" />
		</form>
		<view @click="fliterHandle" class="searchBtn">搜索</view>
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
</script>
<style>
.search {
	width: 90%;
	margin-top: 16rpx;
	margin: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.searchInput {
	width: 90%;
	height: 60rpx;
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