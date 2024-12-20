import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import propTypes from 'prop-types'
import { getAllreply, getOnePost, postDelReply } from '../../../../services/post/post'
import DeleteBox from '../../../../components/DeleteBox'
import Date from '../../../../components/Date'
import { useLanguage } from '../../../../store/LanguageContext'
interface ReplyItem {
    _id: string;
    replyUser: { username: string };
    replyToreplyUser?: { username?: string };
    replyCreateDate: string;
    replyText: string;
    replyUserId: string;
    postId: string;
    replyToreplyUserId?: string;
}
export default function Replycontent({ reLoad, commentid, userReplyData, setInputData, reloadUserReply, setreloadUserReplys }) {
    const{t}=useLanguage();
    const [responseData, setResponseData] = useState<ReplyItem[]>([])
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

    const deletReplyHandler = (replyId:string) => {
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
                return alert(t('PostDeleted'))
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
                        <div className='w-full'>
                            <div className='font-bold flex space-x-2 items-center'> 
                                <span>
                                {item.replyUser.username}@{item.replyToreplyUser?.username||null}
                                </span>
                            <Date>
                                {item.replyCreateDate}
                            </Date>
                            <div>:
                            </div>
                            </div>
                            <div className='whitespace-normal break-words text-[--fontColor] box-border'>
                            {item.replyText}
                            </div>
                        </div> :
                        <div className=' w-full' >
                            <div className='font-bold flex space-x-2 items-center'>
                                <div>
                                {item.replyUser.username}
                                </div>
                                <Date className='text-nowrap'>
                                {item.replyCreateDate}
                                 </Date>
                            <div>:</div>
                            </div>
                            <div className='whitespace-normal break-words text-[--fontColor] box-border'>
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
                                    <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => getOnePostApi(item.postId)}>{t('intoPost')}</span>}
                                <span className='w-[150px] h-[50px] bg-[--boxColor] flex justify-center items-center rounded-my-rounded-10px hover:bg-[--boxHoverColor] hover:text-[--hostColor]' onClick={() => setInputData({ targetName: '@' + item.replyUser.username, commentid: commentid, replyToreplyUserId: item.replyUserId })}>{t('reply')}{item.replyUser.username}</span>
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