import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Post.module.css'
import PropTypes from 'prop-types';
/* props $ */
export default function Post(props) {
    /*          根目录的文章           */
    const navigate = useNavigate();
    const [localStorageData, setLocalStorageData] = useState({});
    const postDeleteBox = useRef();
    const [targetID, setTargetID] = useState('');
    const [mouseOver, setMouseOver] = useState({
        share: false,
        comments: false,
        star: false,
        like: false,
    });
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
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
        axios({
            url: `http://127.0.0.1:4000/post/like/${props.id}`,
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
        axios({
            url: `http://127.0.0.1:4000/post/favorite/${props.id}`,
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
        const data = JSON.stringify(props)
        /*在ulr加/斜杠和不加是有区别的，加入会把路径替换，不加这是在路径后面加上这个路径  */
        navigate(`/homepage/${props.id}`, { state: data });
    };
    // 分享按钮设置，点击然后分享url
    const sharehandler = (e) => {
        e.stopPropagation()
        const pathname = `http://localhost:3000/homepage/${props.id}`
        navigator.clipboard.writeText(pathname).then(() => {
            console.log("复制成功");
        }, (error) => {
            console.log("复制失败：", error);
        });
    }
    const deletePostApi = () => {
        if (localStorageData.userid === props.postUserId) {
            axios({
                url: `http://127.0.0.1:4000/delpost/${props.id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`
                }
            }).then((res) => {
                console.log(res.data)
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
    class PostIcon {
        constructor(path) {
            {/* global process*/ }
            this.path = process.env.PUBLIC_URL + path
        }
    }
    const postIcon1 = new PostIcon('/static/postIcon/赞.svg')
    const postIcon2 = new PostIcon('/static/postIcon/评论.svg')
    const postIcon3 = new PostIcon('/static/postIcon/星星.svg')
    const postIcon4 = new PostIcon('/static/postIcon/分享.svg')
    const postIcon11 = new PostIcon('/static/postIconPitchUp/赞.svg')
    const postIcon22 = new PostIcon('/static/postIconPitchUp/评论.svg')
    const postIcon33 = new PostIcon('/static/postIconPitchUp/星星.svg')
    const postIcon44 = new PostIcon('/static/postIconPitchUp/分享.svg')
    return (
        <div className={style.messagebigbox} onClick={navgatehandle}>
            <div className={style.messagebox}>
                <div className={style.thisshowname} onClick={e => e.stopPropagation()} style={{ justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={style.handimg}>
                            <img src={props.headimg} className={style.img}></img>
                        </div>
                        <Link className={style.handname}>{props.name}</Link>
                    </div>
                    <div onClick={() => targetIDHandler(props.id)} style={{ position: "relative" }} >...
                        {targetID === props.id ?
                            <div className={style.postDeleteBox} onClick={e => e.stopPropagation()} ref={postDeleteBox}>
                                {(localStorageData.userid === props.postUserId) ?
                                    <span className={style.postDeleteBoxButton} onClick={deletePostApi}>删除</span> :
                                    null}
                                <span className={style.postDeleteBoxButton}>举报</span>
                            </div> : null}
                    </div>
                </div>
                <div className={style.thisshowcontent}>
                    {props.content}
                    {(props.postImages.length === 0 || props.postImages === '') ? null : (<img src={props.postImages} className={style.img}></img>)}
                </div>
                <div className={style.postBottom} >
                    <div className={style.likesIcon} onClick={likehandle}
                        onMouseEnter={() => setMouseOver({ ...mouseOver, like: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, like: false })}
                    >
                        {mouseOver.like ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon11.path} alt='点赞'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon1.path} alt='点赞'></img>}
                        {props.likes}
                    </div>
                    <div className={style.starIcon}
                        onMouseEnter={() => setMouseOver({ ...mouseOver, comments: true })}
                        onMouseLeave={() => setMouseOver({ ...mouseOver, comments: false })}>
                        {mouseOver.comments ?
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon22.path} alt='评论'></img>
                            :
                            <img style={{ width: '100%', height: '100%', verticalAlign: 'middle', textAlign: 'center' }} src={postIcon2.path} alt='评论'></img>}
                        {props.comments}
                    </div>
                    <div className={style.star} onClick={favoritehandler}
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
                    <div className={style.share} onClick={sharehandler}
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
    id: PropTypes.string.isRequired,
    headimg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postImages: PropTypes.string,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    favorites: PropTypes.number.isRequired,
    postUserId: PropTypes.string.isRequired,
    reload: PropTypes.shape({
        reload: PropTypes.bool.isRequired,
        setLoad: PropTypes.func.isRequired,
    }).isRequired,
    reloadUserArticle: PropTypes.bool,
    setreloadUserArticle: PropTypes.func,
};