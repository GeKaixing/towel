import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import style from './Post.module.css'
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
export default function Post(props) {
    /*          根目录的文章           */
    const navigate = useNavigate()
    const [firststyle, setfirststyle] = useState(false)
    const [localStorageData, setLocalStorageData] = useState({})
    // 收藏数&状态
    const [favoritestate, setfavoritestate] = useState(false)
    const postDeleteBox = useRef()
    const [targetID, setTargetID] = useState('')
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
        console.log('in development')
    }
    // 更新按钮
    const upfavoritehandler = (e) => {
        e.stopPropagation()
        console.log('in development')
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
                <div className={style.thisshowtheme} onClick={e => e.stopPropagation()}>
                    <Link>{props.contenttheme}</Link>
                </div>
                <div className={style.thisshowcontent}>
                    {props.content}
                    {(props.postImages.length === 0 || props.postImages === '') ? null : (<img src={props.postImages} className={style.img}></img>)}
                </div>
                <div className={style.thisshowbottom} >
                    <div>
                        <Link id='like' className={firststyle ? style.redlike : style.whitelike} onClick={likehandle}><LikeFilled />{props.likes}</Link>
                    </div>
                    <div>
                        <Link className={style.MessageFilled} ><MessageFilled />{props.comments}</Link>
                    </div>
                    <div className={favoritestate ? style.nostar : style.star} onClick={upfavoritehandler} >
                        <StarFilled />收藏{props.favorites}
                    </div>
                    <div className={style.share} onClick={sharehandler}>
                        <RocketFilled />分享
                    </div>
                </div>
            </div>
        </div>
    )
}
