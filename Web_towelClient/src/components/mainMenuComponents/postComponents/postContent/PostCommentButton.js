import React, { useState } from 'react'
import Replycontent from './PostReplyContent'
import style from './PostCommentButton.module.css'
import propTypes from 'prop-types'
export default function Reply({ likes, commentid, setInputData, commentName, reLoad }) {
    /*        回复评论组件        */
    // 控制回复预览的显示
    const [replyshow, isreplyshow] = useState(false)
    const [mouseOver, setMouseOver] = useState(false);
    const likeHandle = () => { console.log('in development') }
    class PostIcon {
        constructor(path) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    let postIcon1 = new PostIcon('/static/postIcon/赞.svg')

    const postIcon11 = new PostIcon('/static/postIconPitchUp/赞.svg')
    return (
        <>
            <div className={style.reply}>
                <div className={style.like} onClick={likeHandle}
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}>
                    {
                        mouseOver ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>
                    }
                    {likes}</div>
                <div onClick={() => setInputData({ targetName: '@' + commentName, commentid: commentid })}>回复</div>
                <div className={style.replynumbe} onClick={() => isreplyshow(!replyshow)}>显示回复</div>
            </div>
            {/* 这是回复 */}
            {replyshow ?
                <div>
                    <Replycontent reLoad={reLoad} commentid={commentid} setInputData={setInputData} ></Replycontent>
                </div>
                : null}
        </>
    )
}
Reply.propTypes = {
    likes: propTypes.number.isRequired,
    commentid: propTypes.number.isRequired,
    setInputData: propTypes.func.isRequired,
    commentName: propTypes.string.isRequired,
    reLoad: propTypes.func.isRequired
}
