
import React, {useState } from 'react'
import PostComment from './PostComment'
import style from './PostInput.module.css'
import { useNavigate } from 'react-router'
import { getSocket } from '../../../../socket/socket'
import propTypes from 'prop-types'
import { postAddPostComment, postAddPostReply } from '../../../../services/post/post'
import useLocalStorage from '../../../../hooks/useLocaStorage'

export default function PostInput({ postId }) {
    const navigate = useNavigate()
    const [localStorageData] =  useLocalStorage()
   
    const [inputData, setInputData] = useState('')//get the input value
    const [inputReplyData, setInputReplyData] = useState({}) //get thie input valur that who is @ value
    const [reLoad, seReLoad] = useState(false)//使相关了的get请求刷新
    function sendInputData() {
        postAddPostComment(postId,{ data: {
            postId: postId,
            commentUserId: localStorageData.userid,
            Text: inputData,
            Image: null,
            Like: 0
        }}).then(() => {
            setInputData('')
            seReLoad(!reLoad)
        }).catch((error) => {
            console.log(error)
        })
    }
    const sendInputDataApi = () => {
        if ((localStorageData == {})) {
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
        postAddPostReply({ data: {
            postId: postId,
            commentId: inputReplyData.commentid,
            replyUserId: localStorageData.userid,
            replyText: inputData,
            replyToreplyUserId: inputReplyData.replyToreplyUserId || null,
            replyImages: null,
            replyLike: 0,
            replyComment: null
        }}).then(() => {
            const socket = getSocket()
            if (inputReplyData.replyToreplyUserId) {
                console.log(inputReplyData.replyToreplyUserId)
                //发送对方的id
                socket.emit(`newMessage`, {newMessage: true,userid:inputReplyData.replyToreplyUserId})
            }
            setInputData('')
            seReLoad(!reLoad)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <div className={style.comment}>
                {
                    Object.keys(inputReplyData).length !== 0 ?
                        <div className={style.inputReplyData}>{inputReplyData.targetName}
                            <div className={style.inputReplyDataDelButton} onClick={() => setInputReplyData('')}>X</div>
                        </div> : null
                }
                <input className={style.commentimport} value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='评论'></input>
                <button className={style.commentbutton} onClick={sendInputDataApi}>发表</button>
            </div>
            <PostComment reLoad={reLoad} postId={postId} setInputData={setInputReplyData}></PostComment>
        </>

    )
}
PostInput.propTypes={
    postId:propTypes.string
}