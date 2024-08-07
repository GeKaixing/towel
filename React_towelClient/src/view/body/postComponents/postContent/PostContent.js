import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PostInput from './PostInput';
// import style from './PostContent.module.css'
// import axios from 'axios';
import { postPostfavorite, postPostLike } from '../../../../services/post/post';
import useLocalStorage from '../../../../hooks/useLocaStorage';
import likeIcon from '../../../../assets/static/postIcon/赞.svg'
import startIcon from '../../../../assets/static/postIcon/星星.svg'
import shareIcon from '../../../../assets/static/postIcon/分享.svg'
import likeIPichcon from '../../../../assets/static/postIconPitchUp/赞.svg'
import startPichIcon from '../../../../assets/static/postIconPitchUp/星星.svg'
import sharePichIcon from '../../../../assets/static/postIconPitchUp/分享.svg'
export default function PostContent() {
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState({})
    const [localStorageData] = useLocalStorage()
    // const navigate = useNavigate()
    //获取当前路由
    const { pathname, state } = useLocation()
    const [mouseOver, setMouseOver] = useState({
        share: false,
        star: false,
        like: false,
    });
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
            } else {
                setcontent(data)
            }
        }
    }, [state, pathname])
    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        postPostLike(contentdata.id, {
            data: {
                userId: localStorageData.userid
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
        postPostfavorite(contentdata.id, {
            data: {
                userId: localStorageData.userid
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
    let postIcon1 = new PostIcon(likeIcon)
    let postIcon3 = new PostIcon(startIcon)
    let postIcon4 = new PostIcon(shareIcon)

    const postIcon11 = new PostIcon(likeIPichcon)
    const postIcon33 = new PostIcon(startPichIcon)
    const postIcon44 = new PostIcon(sharePichIcon)

    return (
        <div className='flex flex-col p-2'>
            <div className='flex flex-col '>
                <div className=''>
                    <div className=''>
                        <div className='flex items-center f space-x-2 mb-2'>
                            <img src={contentdata.headimg} className='w-10 h-10 rounded-my-rounded-10px'></img>
                            <Link className='font-bold'>{contentdata.name}</Link>
                        </div>
                        <div className='flex flex-col justify-center items-center text-[--fontColor] font-bold' >
                            <div className='self-start'>
                                {contentdata.content}
                            </div>
                            {(contentdata.postImages?.length === 0 || contentdata.postImages === '') ? null : (<img src={contentdata.postImages} className=''></img>)}
                        </div>
                        <div className='flex w-full flex-row justify-around h-5 ' onClick={likehandle}>
                            <div className='flex '
                                onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                            >
                                {mouseOver.like ?
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                                    :
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>}
                                {contentdata.likes}
                            </div>
                            <div className='flex ' onClick={favoritehandler}
                                onMouseEnter={() => setMouseOver({ ...mouseOver, star: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, star: false })}>
                                {
                                    mouseOver.star ?
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon33.path} alt='收藏'></img>
                                        :
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path} alt='收藏'></img>

                                }{contentdata.favorites}
                            </div>
                            <div className='flex ' onClick={sharehandler}
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
        </div>
    )
}