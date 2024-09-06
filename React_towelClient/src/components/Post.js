import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { postPostLike, deletePost, postPostfavorite } from '../services/post/post'
import useLocalStorage from '../hooks/useLocaStorage';
import DeleteBox from './DeleteBox';
import likeIcon from '../assets/static/postIcon/赞.svg'
import commentIcon from '../assets/static/postIcon/评论.svg'
import startIcon from '../assets/static/postIcon/星星.svg'
import shareIcon from '../assets/static/postIcon/分享.svg'
import likeIPichcon from '../assets/static/postIconPitchUp/赞.svg'
import commentPichIcon from '../assets/static/postIconPitchUp/评论.svg'
import startPichIcon from '../assets/static/postIconPitchUp/星星.svg'
import sharePichIcon from '../assets/static/postIconPitchUp/分享.svg'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';
/* props $ */
export default function Post(props) {
    // console.log(props.setreloadUserArticle)
    // console.log(props.content.props.dangerouslySetInnerHTML.__html)
    /*          根目录的文章           */
    const navigate = useNavigate();
    const [localStorageData] = useLocalStorage();
    const postDeleteBox = useRef();
    const [targetID, setTargetID] = useState('');
    const [date,setDate]=useState('')
    const [mouseOver, setMouseOver] = useState({
        share: false,
        comments: false,
        star: false,
        like: false,
    });
    const formatDateHandler=()=>{
        setDate(dayjs(props.postCreateDate).format('HH:mm'))
    }
    useEffect(() => {
        formatDateHandler()
    }, [props.postCreateDate])
    useEffect(() => {
        const handleClick = (e) => {
            if (!(e.target === postDeleteBox.current)) {
                setTargetID('');
            }
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick);
        }
    }, [localStorage])

    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        postPostLike(props.id, {
            data: {
                userId: localStorageData.userid
            }
        }).then((response) => {
            console.log(response.data)
            if (response.status === 201) {
                props.reload.setLoad(!props.reload.reload)
            } else if (response.status === 200) {
                alert(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    // 更新按钮
    const favoritehandler = (e) => {
        e.stopPropagation()
        postPostfavorite(props.id, {
            data: {
                userId: localStorageData.userid
            }
        }).then((response) => {

            if (response.status === 201) {
                props.reload.setLoad(!props.reload.reload)
            } else if (response.status === 200) {
                alert(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    // 跳转到指点的路由的函数
    const navgatehandle = (e) => {
        e.stopPropagation()
        const propsData = detectMarkdown(props.content) ? { ...props, content: DOMPurify.sanitize(marked(props.content)), markdown: true } : props
        const changeData = props.blog ? { ...props, content: props.content.props.dangerouslySetInnerHTML.__html } : propsData
        const data = JSON.stringify(changeData)
        /*在ulr加/斜杠和不加是有区别的，加入会把路径替换，不加这是在路径后面加上这个路径  */
        navigate(`/postcontent/${props.id}`, { state: data });
    };
    // 分享按钮设置，点击然后分享url
    const sharehandler = (e) => {
        e.stopPropagation()
        const pathname = `${process.env.REACT_APP_DOMAIN}/postcontent/${props.id}`
        navigator.clipboard.writeText(pathname).then(() => {
            console.log("复制成功");
        }, (error) => {
            console.log("复制失败：", error);
        });
    }
    const deletePostApi = () => {
        if (localStorageData.userid === props.postUserId) {
            deletePost(props.id).then(() => {
                props.reload.setLoad(!props.reload.reload)
                props.setreloadUserArticle(!props.reloadUserArticle)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            alert('error')
        }
    }
    const targetIDHandler = (id) => {
        if (targetID) {
            setTargetID('')
        } else {
            setTargetID(id)
        }
    }
    const detectMarkdown = (text) => {
        // 简单的正则表达式检测 Markdown 标题、列表和粗体
        const markdownRegex = /^(# |- \s|\*\*|\*|`|>\s)/;
        return markdownRegex.test(text);
    };
    class PostIcon {
        constructor(path) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    const postIcon1 = new PostIcon(likeIcon)
    const postIcon2 = new PostIcon(commentIcon)
    const postIcon3 = new PostIcon(startIcon)
    const postIcon4 = new PostIcon(shareIcon)
    const postIcon11 = new PostIcon(likeIPichcon)
    const postIcon22 = new PostIcon(commentPichIcon)
    const postIcon33 = new PostIcon(startPichIcon)
    const postIcon44 = new PostIcon(sharePichIcon)

    const reportApi = () => {
        alert('举报成功')
    }
    return (
        <div className='flex flex-col text-[--fontColor] justify-center mb-6
         border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2  
         rounded-my-rounded-10px  p-2' onClick={navgatehandle}>
            <div className='flex flex-col space-y-2 '>
                <div className='flex flex-row justify-between items-center' onClick={e => e.stopPropagation()} style={{ justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <div className='flex flex-row space-x-2 items-center object-fill'>
                        <img src={props.headimg} className='w-10 h-10 rounded-full '></img>
                        <Link className='font-blod' to={`./userhomepage/${props.postUserId}`}>{props.name}</Link>
                    </div>
                    <div className='flex items-center space-x-2 '>
                    <div className='text-sm text-[--boxHoverColor]'>{
                                        date     }</div>
                    <div onClick={() => targetIDHandler(props.id)} className='relative cursor-pointer'>
                    ...
                        {targetID === props.id ?    
                            <DeleteBox postUserId={props.postUserId} headimg={props.headimg} userName={props.name} deleteHandler={deletePostApi} DeleteBox={postDeleteBox} reportHandler={reportApi}></DeleteBox>
                            : null}
                    </div>
                    </div>
                </div>
                <div className='felx flex-col space-y-2 '>
                    <div className='text-2xl font-bold'>{props.postTitle}</div>
                    <div className='md:max-w-[39rem] lg:w-full '>{detectMarkdown(props.content) ?
                     <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(props.content)) }} /> 
                    : <div>{props.content}</div>}</div>
                    {(props.postImages?.length !== 0 ) &&
                        <div className='flex justify-between flex-wrap gap-2'>
                         <img src={props.postImages} className='w-[30%]'></img>
                        </div>
                    }
                   { props.postVideos&&<video className='w-full h-auto' controls>
                    <source src={props.postVideos} type="video/mp4" />
                   </video>}
                </div>
                <div className='flex flex-row justify-around h-5 text-[--fontColor]' >
                    <div className='flex flex-row items-center hover:text-[host]' onClick={likehandle}
                        onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                    >
                        {mouseOver.like ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>}
                        {props.likes}
                    </div>
                    <div className='flex flex-row items-center'
                        onMouseEnter={() => setMouseOver({ ...mouseOver, comments: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, comments: false })}>
                        {mouseOver.comments ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon22.path} alt='评论'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon2.path} alt='评论'></img>}
                        {props.comments}
                    </div>
                    <div className='flex flex-row items-center'
                        onClick={favoritehandler}
                        onMouseEnter={() => setMouseOver({ ...mouseOver, star: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, star: false })}>
                        {
                            mouseOver.star ?
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon33.path} alt='收藏'></img>
                                :
                                <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon3.path} alt='收藏'></img>
                        }
                        {props.favorites}
                    </div>
                    <div className='flex flex-row items-center'
                        onClick={sharehandler}
                        onMouseEnter={() => setMouseOver({ ...mouseOver, share: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, share: false })}>
                        {mouseOver.share ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon44.path} alt='分享'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon4.path} alt='分享'></img>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
Post.propTypes = {
    postVideos: PropTypes.string,
    id: PropTypes.string.isRequired,
    headimg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.PropTypes.object,
    ]),
    postImages: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    favorites: PropTypes.number,
    postUserId: PropTypes.string.isRequired,
    reload: PropTypes.shape({
        reload: PropTypes.bool.isRequired,
        setLoad: PropTypes.func.isRequired,
    }),
    reloadUserArticle: PropTypes.bool,
    setreloadUserArticle: PropTypes.func,
    blog: PropTypes.bool,
    postTitle: PropTypes.string,
    postCreateDate: PropTypes.string,
};