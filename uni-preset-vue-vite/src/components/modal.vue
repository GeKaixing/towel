<script setup>
import { ref } from 'vue';

const modalState = ref(true)
const emit = defineEmits(['deleteHandler'])
const props=defineProps(['postUserId'])
const localStorageData = JSON.parse(uni.getStorageSync('logindata'))


const deleteHandler = () => {
    emit('deleteHandler')
    closeHandler()
}
const closeHandler = () => {
    modalState.value = false
}
const reportHandler=()=>{
uni.showModal({
    content: '举报成功',
    showCancel: false
})
}
</script>
<template>
    <Teleport to="body">
        <view v-if="modalState" class="modal">
            <view class="modal-content">
                <slot></slot> 
                <view v-if='props.postUserId===localStorageData.userid' @click="deleteHandler">删除</view>
                <view @click="reportHandler">举报</view>
                <view @click="closeHandler" id="modal-close" >关闭</view>
            </view>
        </view>
    </Teleport>
</template>
<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgba(134, 196, 248, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-content {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-content>view {
    background-color: #f6f6f6;
    width: 400rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
}
#modal-close{
    background-color:rgba(248, 196, 134, 1);
}
</style>