
import React, { useState } from 'react'
import PostComment from './PostComment'
import { useNavigate } from 'react-router'
import { getSocket } from '../../../../socket/socket'
import propTypes from 'prop-types'
import { postAddPostComment, postAddPostReply } from '../../../../services/post/post'
import useLocalStorage from '../../../../hooks/useLocaStorage'
import dayjs from 'dayjs'
import {inputReplyData} from '../../../../types/body/postComponents/postContent/postInput'
export default function PostInput({ postId }) {
    const navigate = useNavigate()
    const [localStorageData] = useLocalStorage()
    const [inputData, setInputData] = useState('')//get the input value
    const [inputReplyData, setInputReplyData] = useState<inputReplyData>({}) //get thie input valur that who is @ value
    const [reLoad, seReLoad] = useState(false)//使相关了的get请求刷新
    function sendInputData() {
        postAddPostComment(postId, {
            data: {
                postId: postId,
                commentUserId: localStorageData.userid,
                Text: inputData,
                Image: null,
                Like: 0,
                CreateDate: dayjs().format(),
            }
        }).then(() => {
            setInputData('')
            seReLoad(!reLoad)
        }).catch((error) => {
            console.log(error)
        })
    }
    const sendInputDataApi = () => {
        if (Object.keys(localStorageData).length === 0) {
            navigate('/login')
        }
        else if (Object.keys(inputReplyData).length !== 0) {
            sendInputReplyDataApi()
        } else if (inputData !== '') {
            sendInputData()

        }
        else {
            console.log(' input to null')
        }
    }
    const sendInputReplyDataApi = () => {
        postAddPostReply({
            data: {
                postId: postId,
                commentId: inputReplyData.commentid,
                replyUserId: localStorageData.userid,
                replyText: inputData,
                replyToreplyUserId: inputReplyData.replyToreplyUserId || null,
                replyImages: null,
                replyLike: 0,
                replyComment: null,
                CreateDate: dayjs().format(),
            }
        }).then(() => {
            const socket = getSocket()
            if (inputReplyData.replyToreplyUserId) {
                //发送对方的id
                socket.emit(`newMessage`, { newMessage: true, userid: inputReplyData.replyToreplyUserId })
            }
            setInputData('')
            seReLoad(!reLoad)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <div className='flex flex-row justify-center h-8 mb-2 space-x-2 text-[--fontColor]'>
                {
                    Object.keys(inputReplyData).length !== 0 ?
                        <div className='flex items-center space-x-2'>
                            <div className='bg-[--boxColor] rounded-my-rounded-10px grow'>{inputReplyData.targetName}</div>
                            <div className=' w-6 h-6 rounded-full bg-[--boxColor] hover:bg-[--assistantColor] flex items-center justify-center cursor-pointer' onClick={() => setInputReplyData({})}>X</div>
                        </div> : null
                }
                <input className='w-[15rem] bg-[--boxColor] rounded-my-rounded-10px focus:border-[--assistantColor] ' value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='评论'></input>
                <button className='w-[4rem] h-8 rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor]' onClick={sendInputDataApi}>发表</button>
            </div>
            <PostComment reLoad={reLoad} postId={postId} setInputData={setInputReplyData}></PostComment>
        </>

    )
}
PostInput.propTypes = {
    postId: propTypes.string
}