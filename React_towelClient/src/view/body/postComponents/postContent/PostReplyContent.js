import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import propTypes from 'prop-types'
import { getAllreply, getOnePost, postDelReply } from '../../../../services/post/post'
import DeleteBox from '../../../../components/DeleteBox'

export default function Replycontent({ reLoad, commentid, userReplyData, setInputData, reloadUserReply, setreloadUserReplys }) {
    const [responseData, setResponseData] = useState([])
    const [reLoadPostReply, setReLoadPostReply] = useState(false)
    const useRoutes = useLocation()
    const navigate = useNavigate()
    const [targetID, setTargetID] = useState('');
    useEffect(() => {
        if(userReplyData){ setResponseData(userReplyData)}
        else if (useRoutes.pathname.split('/')[1] === 'postcontent'||useRoutes.pathname.split('/')[1] ==="userhomepage") {
            getAllreply(commentid).then((response) => {
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }  
      
    }, [userReplyData, useRoutes, reLoadPostReply, reLoad])

    const deletReplyHandler = (replyId) => {
        postDelReply(replyId).then(() => {
            setReLoadPostReply(!reLoadPostReply)
            setreloadUserReplys(!reloadUserReply)
        }).catch((error) => {
            console.log(error)
        })
    }

    const toggleOptions = (id) => {
        if (targetID === id) {
            setTargetID('');
        } else {
            setTargetID(id);
        }
    }
    const getOnePostApi = (POSEID) => {
        getOnePost(POSEID).then((response) => {
            if(       response.data.length===0){
                return alert('文章已删除')
            }
            const data = JSON.stringify({ ...response.data, from: 'user' })
            navigate(`/postcontent/${POSEID}`, { state: data });
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            {responseData.map((item) => (
                <div key={item._id} className='text-[--fontColor] flex justify-between pl-5 '>
                    {(item.replyToreplyUserId !== null) ?
                        <div className='flex'>
                            <div className='font-bold'> 
                            {item.replyUser.username}@{item.replyToreplyUser.username}:
                            </div>
                            <span>
                            {item.replyText}
                            </span>
                        </div> :
                        <div className='flex space-x-2' >
                            <div className='font-bold '>
                                {item.replyUser.username}:
                            </div>
                            <div>
                                {item.replyText}
                            </div>
                        </div>}
                    <div
                        onClick={() => toggleOptions(item._id)}
                        className='relative cursor-pointer'
                     >
                        ...
                        {targetID === item._id &&
                            <DeleteBox postUserId={item.replyUserId} deleteHandler={() => deletReplyHandler(item._id)}>
                                {useRoutes.pathname.split('/')[1] !== 'homepage' &&
                                    <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => getOnePostApi(item.postId)}>进入文章</span>}
                                <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => setInputData({ targetName: '@' + item.replyUser.username, commentid: commentid, replyToreplyUserId: item.replyUserId })}>回复{item.replyUser.username}</span>
                            </DeleteBox>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

Replycontent.propTypes = {
    reLoad: propTypes.bool,
    commentid: propTypes.string,
    userReplyData: propTypes.array,
    setInputData: propTypes.func,
    reloadUserReply: propTypes.bool,
    setreloadUserReplys: propTypes.func
}