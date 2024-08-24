<script setup>
const item=defineProps( ['id','user','postText','postImages','postLike','postComment','postFavorite'])
const navigatorHandler=()=>{
    uni.navigateTo({
        url:`postContent/postContent?data=${JSON.stringify(item)}`
    })
}
</script>
<template>
        <view class="post" @click="navigatorHandler">
            <view class="post-head">
                <view class="post-image-name">
                    <image :src="item.user.headimg"
                        class="post-image"></image>
                    <view class="post-name">{{ item.user.username }}</view>
                </view>
                <view class="post-head-button">...</view>
            </view>
            <view class="post-context">{{item.postText}}</view>
            <image v-if="item.postImages.length>0" class="post-context-image"  :src="item.postImages"></image>
            <view class="post-button">
                <view class="post-button-icon">
                    <image src="../static/postIcon/赞.svg" mode="scaleToFill"></image>
                    <view>{{item.postLike}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../static/postIcon/评论.svg" mode="scaleToFill"></image>
                    <view>{{item.postComment}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../static/postIcon/星星.svg" mode="scaleToFill"></image>
                    <view>{{item.postFavorite}}</view>
                </view>
                <view  class="post-button-icon">
                    <image src="../static/postIcon/分享.svg" mode="scaleToFill"></image>
                </view>
            </view>
        </view> 
</template>
<style scoped>
.post-context-image{
    margin: auto ;
}
.post {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    border-radius: 10rpx;
    padding: 10rpx;
    border: 4rpx solid #f6f6f6;
}

.post-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.post-image-name {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10rpx;
}

.post-image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
}

.post-name {
    font-weight: bold;
}

.post-head-button {
    font-weight: bold;
}

.post-button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.post-button>view>image {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    object-fit: cover;
}
.post-button-icon{
    display: flex;
    align-items: center;
}
</style>