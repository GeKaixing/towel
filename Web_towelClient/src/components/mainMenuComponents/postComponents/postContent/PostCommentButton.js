import React, { useState } from 'react'
import Replycontent from './PostReplyContent'
import style from './PostCommentButton.module.css'
import { LikeFilled } from '@ant-design/icons'
import propTypes from 'prop-types'
export default function Reply({ likes, commentid, setInputData, commentName, reLoad }) {
    /*        回复评论组件        */
    // 控制回复预览的显示
    const [replyshow, isreplyshow] = useState(false)
    const likeHandle = () => {
        console.log('in development')
    }
    return (
        <>
            <div className={style.reply}>
                <div className={style.like} onClick={likeHandle}><LikeFilled />{likes}</div>
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
    likes:propTypes.number.isRequired,
    commentid:propTypes.number.isRequired,
    setInputData:propTypes.func.isRequired,
    commentName:propTypes.string.isRequired,
    reLoad:propTypes.func.isRequired
}
