import React, { useEffect, useRef, useState } from 'react'
import style from './PostReplyContent.module.css'
import { useLocation, useNavigate } from 'react-router'
import propTypes from 'prop-types'
import useLocalStorage from '../../../../hooks/useLocaStorage'
import { getAllreply, getOnePost, postDelReply } from '../../../../services/post/post'

export default function Replycontent({ reLoad, commentid, userReplyData, setInputData, reloadUserReply, setreloadUserReplys }) {
    const [localStorageData] = useLocalStorage();
    const [responseData, setResponseData] = useState([])
    const [reLoadPostReply, setReLoadPostReply] = useState(false)
    const [showOptions, setShowOptions] = useState('')
    const useRoutes = useLocation()
    const ReplycontentRefs = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (useRoutes.pathname.split('/')[1] === 'homepage') {
            getAllreply(commentid).then((response) => {
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setResponseData(userReplyData)
        }
    }, [userReplyData, useRoutes, reLoadPostReply, reLoad])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ReplycontentRefs.current) {
                if (!(ReplycontentRefs.current.className === event.target.className)) {
                    setShowOptions('')
                }
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const deletReplyHandler = (replyId) => {
        postDelReply(replyId).then(() => {
                setReLoadPostReply(!reLoadPostReply)
                setreloadUserReplys(!reloadUserReply)
            })
            .catch((error) => { console.log(error) })
    }

    const toggleOptions = (commentId) => {
        if (showOptions === commentId) {
            setShowOptions('')
        } else {
            setShowOptions(commentId)
        }
    }

    const getOnePostApi = (POSEID) => {
/*         axios({
            url: `http://127.0.0.1:4000/findonepost/${POSEID}`,
            headers: { 'Authorization': `Bearer ${localStorageData.jwt}` }
        }) */
        getOnePost(POSEID).then((response) => {
                const data = JSON.stringify({ ...response.data, from: 'user' })
                navigate(`/homepage/${POSEID}`, { state: data });
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div>
            {responseData.map((item) => (
                <div key={item._id} className={style.replycontent}>
                    {(item.replyToreplyUserId !== null) ?
                        <div className={style.replycontents}>
                            {item.replyUser.username}@{item.replyToreplyUser.username}:{item.replyText}
                        </div> :
                        <div className={style.replycontents}>
                            {item.replyUser.username}:{item.replyText}
                        </div>}
                    <div
                        onClick={() => toggleOptions(item._id)}
                        style={{ position: 'relative' }}
                        ref={ReplycontentRefs}
                        className='ReplycontentRefs'>
                        ...
                        {showOptions === item._id &&
                            <div className={style.postDeleteBox} onClick={e => e.stopPropagation()}>
                                {localStorageData.userid === item.replyUserId &&
                                    <span className={style.postDeleteBoxButton} onClick={() => deletReplyHandler(item._id)}>删除</span>}
                                {useRoutes.pathname.split('/')[1] !== 'homepage' &&
                                    <span className={style.postDeleteBoxButton} onClick={() => getOnePostApi(item.postId)}>进入文章</span>}
                                <span className={style.postDeleteBoxButton} onClick={() => setInputData({ targetName: '@' + item.replyUser.username, commentid: commentid, replyToreplyUserId: item.replyUserId })}>回复{item.replyUser.username}</span>
                                <span className={style.postDeleteBoxButton}>举报</span>
                            </div>}
                    </div>
                </div>
            ))}
        </div>
    )
}
Replycontent.propTypes = {
    reLoad: propTypes.bool.isRequired,
    commentid: propTypes.string.isRequired,
    userReplyData: propTypes.object,
    setInputData: propTypes.func,
    reloadUserReply: propTypes.bool,
    setreloadUserReplys: propTypes.func
}