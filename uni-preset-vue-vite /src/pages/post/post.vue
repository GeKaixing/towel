<script setup>
import Page from '../../style/pageLayout.vue';
</script>
<template>
  <page-meta>
    <navigation-bar title="主页" />
  </page-meta>
  <Page>
    <view class="post">
      <view class="post-head">
        <view class='post-user-info-button'>
          <view class='post-user-info'>
            <image class="post-head-image"
              src="https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true"></image>
            <text class="post-head-name">test</text>
          </view>
          <view>...</view>
        </view>
        <view class="post-context">
          <text>test</text>
        </view>
      </view>
      <view class="post-button">
        <image></image>
        <image></image>
        <image></image>
      </view>
      <view></view>
    </view>
    </Page>
</template>
<style scoped>
.post {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.post-head-image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  object-fit: cover;
}

.post-user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
}

.post-user-info-button {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.post-button {
  display: flex;
  justify-content: space-between;
}

.post-button>image {
  width: 60rpx;
  height: 60rpx;
  background-color: black;
  border-radius: 100%;
}
</style>