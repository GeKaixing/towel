<script setup>
import { computed } from "vue";
import { usePostStore } from '../../piniaStore/postStore.js'
import roof from "../../roof/roof.vue";
import {useCommentReplyInputStore} from '../../piniaStore/comment_reply_input.js'
const {postUniRequst}=usePostStore()
const {userRequst}=useCommentReplyInputStore()
const emit = defineEmits(['child-click','userReplyHandlers']);
const props = defineProps(['saveUserDataProps','type']);
const emitUserSelectHandler = () => {
    emit('child-click', false)
};
//控制是否显示删除框
const showDel = computed(() => {
    return (props.saveUserDataProps.userName === uni.getStorageSync('username')) ? true : false;
})
//请求用户的回复
const userReply=()=>{
    uni.request({
            url: `http://127.0.0.1:4000/getusereply/${uni.getStorageSync('userid')}`,
            header: {
                token: uni.getStorageSync('jwt')
            },
            success: (res) => {
                emit('userReplyHandlers', res.data)
            },
            fail: (error) => {
                console.log(error)
            }
        })
}
const delHandlers=()=>{
    switch (props.type){
        case 'post':
        return delHandler('delpost',props.saveUserDataProps.Id,postUniRequst)
        break;
        case 'comment':
        return delHandler('delcomment',props.saveUserDataProps.Id,userRequst)
        case 'reply':
        return delHandler('delreply',props.saveUserDataProps.Id,userReply)
        break;
        default:
            return
    }
    
}
//删除操作
const delHandler=(urls,id,events)=>{
    uni.request({
        url: `http://127.0.0.1:4000/${urls}/${id}`,
        method: 'DELETE',
        header: {
            'token': uni.getStorageSync('jwt'),
        },
        success: (res) => {
            events()
            emit('child-click', false)
        },
        fail: (error) => {
            console.log(error)
        }
    })
}
</script>
<template>
<roof @click="emitUserSelectHandler">
        <view class="userSelectHandler">
            <view class="del" v-if='showDel' @click='delHandlers'>删除</view>
            <view>复制链接</view>
            <view>举报</view>
            <view @click='emitUserSelectHandler'>取消</view>
        </view>
</roof>
</template>
<style>
.userSelectHandler {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgb(189, 189, 189);
    width: 200rpx;
    height: 400rpx;
    display: flex;
    padding-top: 16rpx;
    flex-direction: column;
    gap: 16rpx;
    align-items: center;
}

.del {
    color: red;
}
</style>