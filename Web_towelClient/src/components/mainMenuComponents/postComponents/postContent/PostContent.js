import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PostInput from './PostInput';
import style from './PostContent.module.css'
import axios from 'axios';
export default function Content() {
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState({})
    const [localStorageData, setLocalStorageData] = useState({});
    //获取当前路由
    const { pathname, state } = useLocation()
    const [mouseOver, setMouseOver] = useState({
        share: false,
        star: false,
        like: false,
    });
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
        if (state) {
            const data = JSON.parse(state)
            console.log(data)
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
            } else {
                setcontent(data)
            }
        }
    }, [state, pathname])
    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        axios({
            url: `http://127.0.0.1:4000/post/like/${contentdata.id}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorageData.jwt}`
            },
            data: {
                data: {
                    userId: localStorageData.userid
                }
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    setcontent({ ...contentdata, likes: contentdata.likes + 1 })
                } else if (response.status === 200) {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // 更新按钮
    const favoritehandler = (event) => {
        event.stopPropagation()
        axios({
            url: `http://127.0.0.1:4000/post/favorite/${contentdata.id}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorageData.jwt}`
            },
            data: {
                data: {
                    userId: localStorageData.userid
                }
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    setcontent({ ...contentdata, favorites: contentdata.favorites + 1 })
                } else if (response.status === 200) {
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
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
    class PostIcon {
        constructor(path) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    let postIcon1 = new PostIcon('/static/postIcon/赞.svg')
    let postIcon3 = new PostIcon('/static/postIcon/星星.svg')
    let postIcon4 = new PostIcon('/static/postIcon/分享.svg')

    const postIcon11 = new PostIcon('/static/postIconPitchUp/赞.svg')
    const postIcon33 = new PostIcon('/static/postIconPitchUp/星星.svg')
    const postIcon44 = new PostIcon('/static/postIconPitchUp/分享.svg')
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
                        <div className={style.likesIcon}
                            onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                            onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                        >
                            {mouseOver.like ?
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                                :
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>}
                            {contentdata.likes}
                        </div>
                        <div className={style.star} onClick={favoritehandler}
                            onMouseEnter={() => setMouseOver({ ...mouseOver, star: true })}
                            onMouseLeave={() => setMouseOver({ ...mouseOver, star: false })}>
                            {
                                mouseOver.star ?
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon33.path} alt='收藏'></img>
                                    :
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path} alt='收藏'></img>

                            }{contentdata.favorites}
                        </div>
                        <div className={style.share} onClick={sharehandler}
                            onMouseEnter={() => setMouseOver({ ...mouseOver, share: true })}
                            onMouseLeave={() => setMouseOver({ ...mouseOver, share: false })}>
                            {mouseOver.share ?
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon44.path} alt='分享'></img>
                                :
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon4.path} alt='分享'></img>
                            } </div>
                    </div>
                    <PostInput postId={contentdata.id}></PostInput>
                </div>
            </div>
        </div>
    )
}