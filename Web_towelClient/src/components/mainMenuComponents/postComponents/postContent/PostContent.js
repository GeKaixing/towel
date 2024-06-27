import React, { useEffect, useState } from 'react'
import {Link, useLocation } from 'react-router-dom'
import PostInput from './PostInput';
import style from './PostContent.module.css'
import { LikeFilled, StarFilled, RocketFilled } from '@ant-design/icons';
export default function Content() {
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState({})
    //获取当前路由
    const { pathname, state } = useLocation()
    useEffect(() => {
        if (state) {
            const data = JSON.parse(state)
            if (data.from) {
                const datas = {
                    comments: data[0].postComment,
                    content: data[0].postText,
                    headimg: data[0].user.headimg,
                    id: data[0]._id,
                    likes: data[0].postLike,
                    name: data[0].user.username,
                    postImages: data[0].postImages,
                    postUserId: data[0].postUserId,
                }
                setcontent(datas)
            }else{
                setcontent(data)
            }
        }
    }, [state, pathname])
    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        console.log('in development')
    }
    // 更新按钮
    const upfavoritehandler = (event) => {
        event.stopPropagation()
        console.log('in development')
    }
    // 分享按钮
    const sharehandler = () => {
        const at_present_pathname = `http://localhost:3000${pathname}`
        navigator.clipboard.writeText(at_present_pathname).then(() => {
            console.log("复制成功");
        }, (error) => {
            console.log("复制失败：", error);
        });

    }
    return (
        <div className={style.commentpage}>
            <div className={style.message}>
                <div className={style.messagebox}>
                    <div className={style.thisshowname}>
                        <img src={contentdata.headimg} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: "hidden",
                        }}></img>
                        <Link className={style.handname} >{contentdata.name}</Link>
                    </div>

                    <div className={style.thisshowcontent}>
                        {contentdata.content}
                        {(contentdata.postImages?.length === 0 || contentdata.postImages === '') ? null : (<img src={contentdata.postImages} className={style.img}></img>)}
                    </div>
                    <div className={style.thisshowbottom} onClick={likehandle}>
                        <div >
                            <Link className={style.whitelike} ><LikeFilled />{contentdata.likes}</Link>
                        </div>
                        <div className={style.star} onClick={upfavoritehandler}>
                            <StarFilled />{contentdata.favorites}
                        </div>
                        <div className={style.share} onClick={sharehandler}>
                            <RocketFilled />
                            分享
                        </div>
                    </div>
                    <PostInput postId={contentdata.id}></PostInput>
                    {/*  <input placeholder='评论'>
                </input> */}
                </div>
            </div>
        </div>
    )
}