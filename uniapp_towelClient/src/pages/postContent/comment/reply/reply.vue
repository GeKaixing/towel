<template>
    <postUserSelect v-if='showSelect' 
    @child-click='userSelectHandlerEmit' 
    :saveUserDataProps="saveUserData"
    type='reply'
    @userReplyHandlers='userReplyHandler'
     ></postUserSelect>
    <view :class="ResponseReplyData ? 'reply' : 'userReply'">
        <view class="UserReplyContents" v-for="(item, index) of replyData" :key="index">
            <view v-if="item.replyToreplyUser" class="UserReplyContent">
                <view class="userReplyName">
                    <span @click="store.atHandler(item, item.replyToreplyUser.username)">
                    </span>@<span @click="store.atHandler(item, item.replyUser.username)">{{ item.replyUser.username
                        }}</span>
                    <view>:</view>
                </view>
                <view class="userReplyText">{{ item.replyText }}</view>
                <view @click='showSelectHandler(item.replyUser.username, item._id)'>...</view>
            </view>
            <view v-else class="UserReplyContent">
                <view class="userReplyName" @click="store.atHandler(item, item.replyUser.username)">{{
        item.replyUser.username }}</view>
                <view>:</view>
                <view class="userReplyText">{{ item.replyText }}</view>
            </view>
        </view>
    </view>
</template>
<script setup>
import postUserSelect from '../../../post/postUserSelect/postUserSelect.vue';
import { onMounted, ref, watch } from 'vue'
import { useCommentReplyInputStore } from '../../../../piniaStore/comment_reply_input'
import { storeToRefs } from 'pinia';
const props = defineProps(['commentID']);
const store = useCommentReplyInputStore();
const replyData = ref([]);
const { ResponseReplyData, watchState } = storeToRefs(store)
const showSelect = ref(false);
const saveUserData = ref({ userName: '', Id: '' });
//控制postUserSelect显示的函数
const showSelectHandler = (userName, replyId) => {
    showSelect.value = !showSelect.value
    saveUserData.value.userName = userName;
    saveUserData.value.Id = replyId;
};
//传给父组件postUserSelect函数
const userSelectHandlerEmit = (value) => {
    showSelect.value = value
}
//传给父组件 修改replyData的值
const userReplyHandler=(value)=>{
    replyData.value = value
}
watch(watchState, () => {
    store.reuseRequestReply({
        commentID: props.commentID,
        success: (res) => {
            console.log('这是reply数据', res.data)
            replyData.value = res.data
        }
    })
})
//获取user所有的回复
onMounted(() => {
    /* 
    * 在这里赋值的是不行的，只能打印pinia的响应式数据，因为pinia的响应式数据是异步的，执行顺序不一样
    */
    /* 
    * 判断用户在查看自己的页面还是post的页面
    */
    if ((ResponseReplyData.value)) {
        store.reuseRequestReply({
            commentID: props.commentID,
            success: (res) => {
                console.log('这是reply数据', res.data)
                replyData.value = res.data
            }
        })
    } else {
        uni.request({
            url: `http://127.0.0.1:4000/getusereply/${uni.getStorageSync('userid')}`,
            header: {
                token: uni.getStorageSync('jwt')
            },
            success: (res) => {
                replyData.value = res.data
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
})

</script>
<style>
.userReply {
    width: 90%;
    margin: auto;
    height: auto;
    background-color: #f5f5f5;
}

.reply {
    background-color: #f5f5f5;
    width: 100%;
    height: auto;
}

.UserReplyContents {
    display: flex;
    flex-direction: column;
}

.UserReplyContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.userReplyText {
    margin-right: auto;

}

.userReplyName {
    display: flex;
    flex-direction: row;
}
</style>