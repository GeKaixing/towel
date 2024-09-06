import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PostInput from './PostInput';
// import style from './PostContent.module.css'
// import axios from 'axios';
import { getOnePost, postPostfavorite, postPostLike } from '../../../../services/post/post';
import useLocalStorage from '../../../../hooks/useLocaStorage';
import likeIcon from '../../../../assets/static/postIcon/赞.svg'
import startIcon from '../../../../assets/static/postIcon/星星.svg'
import shareIcon from '../../../../assets/static/postIcon/分享.svg'
import likeIPichcon from '../../../../assets/static/postIconPitchUp/赞.svg'
import startPichIcon from '../../../../assets/static/postIconPitchUp/星星.svg'
import sharePichIcon from '../../../../assets/static/postIconPitchUp/分享.svg'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import useDateFormat from '../../../../hooks/useDateFormat';
import Date from '../../../../components/Date';
export default function PostContent() {
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState({})
    const [localStorageData] = useLocalStorage()
    // const navigate = useNavigate()
    //获取当前路由
    const { pathname, state } = useLocation()
    const params = useParams()
    const [mouseOver, setMouseOver] = useState({
        share: false,
        star: false,
        like: false,
    });
    const detectMarkdown = (text) => {
        // 简单的正则表达式检测 Markdown 标题、列表和粗体
        const markdownRegex = /^(# |- \s|\*\*|\*|`|>\s)/;
        return markdownRegex.test(text);
    };
    const date=useDateFormat(contentdata.postCreateDate)
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
                    postVideos: data[0].postVideos,
                    postUserId: data[0].postUserId,
                    postTitle:data[0].postTitle,
                    postCreateDate:data[0].postCreateDate,
                }
                setcontent(datas)
            } else {
                setcontent(data)
            }
            
        } else {
            getOnePost(params.id).then((response) => {
                console.log(response.data)
                const datas = {
                    comments: response.data[0].postComment,
                    content: detectMarkdown(response.data[0].postText) ? DOMPurify.sanitize(marked(response.data[0].postText)) : response.data[0].postText,
                    headimg: response.data[0].user.headimg,
                    id: response.data[0]._id,
                    likes: response.data[0].postLike,
                    name: response.data[0].user.username,
                    postImages: response.data[0].postImages,
                    postVideos: response.data[0].postVideos,
                    postUserId: response.data[0].postUserId,
                    markdown: detectMarkdown(response.data[0].postText)
                }
                setcontent(datas)
            }).catch(error => console.log(error))
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
    const sharehandler = (event) => {
        event.stopPropagation()
        const at_present_pathname = `${process.env.REACT_APP_DOMAIN}${pathname}`
        navigator.clipboard.writeText(at_present_pathname).then(() => {
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
                            <Link className='font-bold text-[--fontColor] '>{contentdata.name}</Link>
                            <Date>{date}</Date>
                        </div>
                        <div className='flex flex-col justify-center items-center text-[--fontColor] font-bold' >
                            <div className='text-2xl self-start'>{contentdata.postTitle}</div>
                            <div className='self-start w-full'>
                                {contentdata.blog ? <div className='prose lg:prose-xl max-w-none ' dangerouslySetInnerHTML={{ __html: contentdata.content }} /> :
                                    contentdata.markdown ? <div className='prose lg:prose-xl max-w-none' dangerouslySetInnerHTML={{ __html: contentdata.content }}></div> :
                                        <div>{contentdata.content}</div>
                                }
                            </div>
                            {(contentdata.postImages?.length === 0 || contentdata.postImages === '') ? null : (<img src={contentdata.postImages} className=''></img>)}
                            {contentdata.postVideos && <video className='w-full h-auto' controls>
                                <source src={contentdata.postVideos} type="video/mp4" />
                            </video>}
                        </div>
                        <div className='flex w-full flex-row justify-around h-5 ' onClick={likehandle}>
                            <div className='flex text-[--fontColor] '
                                onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                            >
                                {mouseOver.like ?
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                                    :
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>}
                                {contentdata.likes}
                            </div>
                            <div className='flex text-[--fontColor] ' onClick={favoritehandler}
                                onMouseEnter={() => setMouseOver({ ...mouseOver, star: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, star: false })}>
                                {
                                    mouseOver.star ?
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon33.path} alt='收藏'></img>
                                        :
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path} alt='收藏'></img>

                                }{contentdata.favorites}
                            </div>
                            <div className='flex text-[--fontColor] ' onClick={sharehandler}
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