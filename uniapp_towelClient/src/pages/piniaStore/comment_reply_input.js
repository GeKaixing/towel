import { defineStore } from "pinia";
import { ref } from 'vue';
//import { getSocketInstance } from './socket';
import {useSocketStore} from '../piniaStore/socketStore'
export const useCommentReplyInputStore = defineStore('commentReplyInput', () => {
    const socket = useSocketStore().getSocketInstance()
    const atName = ref(null);
    const sendData = ref(null);
    const commentInput = ref(null);
    const watchState = ref(false);//进行数据监听sendReply的状态变换，reply组件进行reuseRequestReply进行重新请求
    const isShow = ref(false);
    const ResponseCommentData = ref(false);
    const commentData = ref([])
    const ResponseReplyData = ref(false)
    const userResponseReplyData = ref([])

    const reuseRequestReply = (options) => {
        const { commentID, success } = options;
        uni.request({
            url: `http://127.0.0.1:4000/allreply/${commentID}`,
            method: 'GET',
            header: {
                'token': uni.getStorageSync('jwt'),
            },
            success,
            fail: (error) => {
                console.log(error)
            }
        })
    }
    /* *
   * 当atHeadler 函数在reply中就不需要适配，只有当函数在comment组件的时，因为使用的数据结构不一样，需要适配/转换数据结构 
   * 主要处理来自comment组件的comment的数据结构适配snedRply函数的data请求数据
   */
    //适配器将转化为sendData数据结构
    const adapterSendData = (data) => {
        let commentUserId,
            commenrUserName
        if ((data?.users)) {
            commentUserId = data.users[0]._id
            commenrUserName = data.users[0].username
        }
        /* 
        * 问题出在 data._id || data.commentId
        * reply也有_id  data._id
        */
        // console.log('这是commentid',data._id || data.commentId)
        console.log(data.commentId || data._id)
        const commentId = data.commentId || data._id,
            replyToreplyUserId = commentUserId || data.replyToreplyUserId,
            replyToreplyUser = commenrUserName || data.replyToreplyUser.headimg,
            replyUser = uni.getStorageSync('username') || data.replyUser.username,
            replyUserId = uni.getStorageSync('userid') || data.replyUserId
        return {
            commentId: commentId,//commentId
            replyUserId: replyUserId,//回复的id
            replyToreplyUserId: replyToreplyUserId,//被回复的id
            replyToreplyUser: replyToreplyUser,//被回复的用户名字
            replyUser: replyUser//回复的用户的名字
        }
    };
    const atHandler = (args, args2) => {
        isShow.value = true;
        sendData.value = adapterSendData(args);
        commentInput.value = `@${args2}:`;
    }
    //发送回复的函数
    const sendReply = (inpuData, postId) => {
        const result = inpuData.replace(/@.*:/, '');
        if (!result) { console.log('输入为空'); return }
        const {
            commentId,
            replyUserId,
            replyToreplyUserId = null,
            replyToreplyUser: { username: replyToreplyUserusername },
            replyUser: { username } } = sendData.value;
        console.log(commentId)
        uni.request({
            url: `http://127.0.0.1:4000/addreply`,
            method: 'POST',
            header: {
                'token': uni.getStorageSync('jwt'),
            },
            data: {
                data: {
                    postId,
                    commentId,
                    replyUserId,
                    replyToreplyUserId,
                    replyText: result,
                    replyImages: null,
                    replyLike: 0,
                    replyComment: null
                }
            },
            success: (res) => {
                commentInput.value = ''
                socket.emit(`${replyToreplyUserId || replyUserId}`);
                watchState.value = !(watchState.value)

            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
    const userRequstComment= () => {
        ResponseCommentData.value = false;
        ResponseReplyData.value = false;
        uni.request({
            url: `http://127.0.0.1:4000/getusecomment/${uni.getStorageSync('userid')}`,
            header: {
                token: uni.getStorageSync('jwt')
            },
            success: (res) => {
                commentData.value = res.data;
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
    const userRequstReply = async () => {
        try {
            const resData = await uni.request({
                url: `http://127.0.0.1:4000/getusereply/${uni.getStorageSync('userid')}`,
                header: {
                    token: uni.getStorageSync('jwt')
                },
            })
            ResponseReplyData.value = false;
            userResponseReplyData.value = resData;
            console.log(userResponseReplyData.value)
            console.log('this userRequstReply is execute')
        } catch (error) {
            console.log('网络问题')
        }
    }
    return {
        userResponseReplyData, ResponseReplyData,
        userRequstReply, userRequstComment,
        atName, commentInput, watchState,
        atHandler, sendReply, reuseRequestReply,
        isShow, ResponseCommentData, commentData
    }
})