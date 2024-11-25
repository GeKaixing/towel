import React, { useState } from 'react'
import Replycontent from './PostReplyContent'
// import style from './PostCommentButton.module.css'
import propTypes from 'prop-types'
import useLocalStorage from '../../../../hooks/useLocaStorage'
import { postCommentsLike } from '../../../../services/post/post'
import likeIcon from '../../../../assets/static/postIcon/赞.svg'
import likePithIcon from '../../../../assets/static/postIconPitchUp/赞.svg'
export default function PostCommentButton({cid,replycontent,replycount, likes, commentid, setInputData, commentName, reLoad, reloadPostComment, seReLoadPostComment }) {
    /*        回复评论组件        */
    // 控制回复预览的显示
    const [replyshow, isreplyshow] = useState(false)
    const [localStorageData] = useLocalStorage();
    const [mouseOver, setMouseOver] = useState(false);
    const likeHandle = (event) => {
        event.stopPropagation()
        postCommentsLike(commentid, {
            data: {
                userId: localStorageData.userid
            }
        }).then((response) => {
            if (response.status === 201) {
                seReLoadPostComment(!reloadPostComment)
            } else if (response.status === 200) {
                alert(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    class PostIcon {
        path:string;
        constructor(path:string) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    let postIcon1 = new PostIcon(likeIcon)

    const postIcon11 = new PostIcon(likePithIcon)
    return (
        <>
            <div className='flex w-[90%] justify-around items-center'>
                <div className='flex justify-center ml-[10px] w-[18px] h-[18px] font-[--fontColor]' onClick={likeHandle}
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}>
                    {
                        mouseOver ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>
                    }
                    {likes}</div>
                <div onClick={() => setInputData({ targetName: '@' + commentName, commentid: commentid })} className=' cursor-default text-[--fontColor]'>回复</div>
                <div className='ml-[10px]  cursor-default text-[--fontColor]'  onClick={() => isreplyshow(!replyshow)} >显示回复{replycount}</div>
            </div>
            {/* 这是回复 */}
            {replyshow &&
                <div>
                    {
                        replycount?
                        <Replycontent reLoad={reLoad} commentid={commentid} setInputData={setInputData} ></Replycontent>
                        : <div className='text-[--fontColor] flex justify-between pl-5 font-bold'>展示没有回复哦</div>
                    }
                </div> }
        </>
    )
}
PostCommentButton.propTypes = {
    likes: propTypes.number,
    commentid: propTypes.string.isRequired,
    setInputData: propTypes.func,
    commentName: propTypes.string.isRequired,
    reLoad: propTypes.bool,
    reloadPostComment: propTypes.bool.isRequired,
    seReLoadPostComment: propTypes.func.isRequired,
    replycount:propTypes.number.isRequired,
}
