import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PostInput from './PostInput';
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
import Date from '../../../../components/Date';
import Backtab from '../../../../components/Backtab';
import {contentdata} from '../../../../types/body/postComponents/postContent/postContent'
export default function PostContent() {
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState<contentdata>({})
    const [localStorageData] = useLocalStorage()
    const [reload,setload] = useState(false)
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
    const getOnePostAPi=async()=>{
        getOnePost(params.id).then( async(response) => {
            const datas = {
                comments: response.data[0].postComment,
                content: detectMarkdown(response.data[0].postText) ? await DOMPurify.sanitize(marked(response.data[0].postText)as string) : response.data[0].postText,
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
            getOnePostAPi()
        }
    }, [state, pathname])
    useEffect(()=>{getOnePostAPi()},[reload])
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
                    setload(i=>!i)
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
                    setcontent({ ...contentdata, favorites: (contentdata.favorites||0) + 1 })
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
        //@ts-ignore
        const at_present_pathname = `${import.meta.env.VITE_DOMAIN}${pathname}`
        navigator.clipboard.writeText(at_present_pathname).then(() => {
        }, (error) => {
            console.log("复制失败：", error);
        });
    }

    return (
        <div className='flex flex-col p-2'>
            <Backtab text='帖子' href='/'></Backtab>
            <div className='flex flex-col '>
                <div className=''>
                    <div className=''>
                        <div className='flex items-center  space-x-2 mb-2'>
                            <img src={contentdata.headimg} className='w-10 h-10 rounded-my-rounded-10px'></img>
                            <div className='font-bold text-[--fontColor] '>{contentdata.name}</div>
                            <Date>{contentdata.postCreateDate}</Date>
                        </div>
                        <div className='flex flex-col justify-center items-center text-[--fontColor] font-bold' >
                            <div className='text-2xl self-start'>{contentdata.postTitle}</div>
                            <div className='self-start w-full'>
                                {contentdata.blog ? <div className='prose lg:prose-xl max-w-none ' dangerouslySetInnerHTML={{ __html: contentdata.content||'' }} /> :
                                    contentdata.markdown ? <div className='prose lg:prose-xl max-w-none' dangerouslySetInnerHTML={{ __html: contentdata.content||'<img src={contentdata.postImages[0]} ></img>:' }}></div> :
                                        <div className='whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: contentdata.content||''}}></div>
                                }
                            </div>
                            {(contentdata.postImages?.length === 0 ) ? null : (contentdata.postImages?.length===0?<img src={contentdata.postImages[0]} ></img>:null)}
                            {contentdata.postVideos && <video className='w-full h-auto' controls>
                                <source src={contentdata.postVideos[0]} type="video/mp4" />
                            </video>}
                        </div>
                        <div className='flex w-full flex-row justify-around h-5 ' onClick={likehandle}>
                            <div className='flex text-[--fontColor] '
                                onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                            >
                                {mouseOver.like ?
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={likeIPichcon} alt='点赞'></img>
                                    :
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={likeIcon} alt='点赞'></img>}
                                {contentdata.likes}
                            </div>
                            <div className='flex text-[--fontColor] ' onClick={favoritehandler}
                                onMouseEnter={() => setMouseOver({ ...mouseOver, star: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, star: false })}>
                                {
                                    mouseOver.star ?
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={startPichIcon} alt='收藏'></img>
                                        :
                                        <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={startIcon} alt='收藏'></img>

                                }{contentdata.favorites}
                            </div>
                            <div className='flex text-[--fontColor] ' onClick={sharehandler}
                                onMouseEnter={() => setMouseOver({ ...mouseOver, share: true })}
                                onMouseLeave={() => setMouseOver({ ...mouseOver, share: false })}>
                                {mouseOver.share ?
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={shareIcon} alt='分享'></img>
                                    :
                                    <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={sharePichIcon} alt='分享'></img>
                                } </div>
                        </div>
                        <PostInput postId={contentdata.id}></PostInput>
                    </div>
                </div>
            </div>
        </div>
    )
}