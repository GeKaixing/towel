<script setup>
const item=defineProps( ['id','user','postText','postLike',])

</script>
<template>
        <view class="post" @click="navigatorHandler">
            <view class="post-head">
                <view class="post-image-name">
                    <image :src="item.user[0].headimg"
                        class="post-image"></image>
                    <view class="post-name">{{ item.user[0].username }}</view>
                </view>
                <view class="post-head-button">...</view>
            </view>
            <view class="post-context">{{item.postText}}</view>
            <view class="post-button">
                    <view class="post-icon">
                        <image class="iconlike" src="../../../static/postIcon/赞.svg" mode="scaleToFill"></image>
                    <view>{{item.postLike}}</view>
                    </view>
                    <view>回复</view>
                    <view>显示回复</view>
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
    margin-bottom: 10rpx;
    margin-top: 10rpx;
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
.post-icon{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.iconlike {
    width: 40rpx;
    height: 40rpx;
    border-radius: 100%;
    object-fit: cover;

}

</style>