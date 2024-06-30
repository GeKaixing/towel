import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './MainMenu.module.css'
import { noReadNumbers } from '../context/noReadNumbers';
export default function MainMenu() {
  const [width, setwidth] = useState(window.innerWidth)
  const [localStorageData, setLocalStorageData] = useState({})
  const { noReadNumber } = useContext(noReadNumbers)
  const router = useLocation()
  useEffect(() => {
    if (localStorage.getItem('loginData')) {
      setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
    }
    const handlerResize = () => {
      setwidth(window.innerWidth)
    }
    // 警听
    window.addEventListener('resize', handlerResize)
    return () => {
      // 卸载警听
      window.removeEventListener('resize', handlerResize);
    }

  }, [window.innerWidth])

  class IconPath {
    constructor(path) {
      this.path = process.env.PUBLIC_URL + path
    }
  }
  class Howshowicon {
    constructor(MainMenuIcon = '/static/MainMenuIcon/首页.svg', MainMenuIconPitchUp = '/static/MainMenuIconPitchUp/首页.svg') {
      this.MainMenuIcon = new IconPath(MainMenuIcon)
      this.MainMenuIconPitchUp = new IconPath(MainMenuIconPitchUp)
    }
    howshowicon(path = '/') {
      return (router.pathname === path) ? this.MainMenuIconPitchUp : this.MainMenuIcon
    }
    home() {
      const pathname = router.pathname.split('/')
      if (router.pathname === '/') {
        return this.MainMenuIconPitchUp
      } else if (pathname[1] === 'homepage') {
        return this.MainMenuIconPitchUp
      } else {
        return this.MainMenuIcon
      }
    }
  }
  const Howshowicon1 = new Howshowicon()
  const Howshowicon2 = new Howshowicon('/static/MainMenuIcon/提示.svg', '/static/MainMenuIconPitchUp/提示.svg')
  const Howshowicon3 = new Howshowicon('/static/MainMenuIcon/评论.svg', '/static/MainMenuIconPitchUp/评论.svg')
  const Howshowicon4 = new Howshowicon('/static/MainMenuIcon/添加.svg', '/static/MainMenuIconPitchUp/添加.svg')
  const Howshowicon5 = new Howshowicon('/static/MainMenuIcon/设置.svg', '/static/MainMenuIconPitchUp/设置.svg')
  return (
    <div>
      <div className={style.bar} >
        {
          width < 750 ? null :
            <div className={style.logo}>
              {/* global process*/}
              <img src={process.env.PUBLIC_URL + '/logo.png'} ></img>
            </div>
        }
        <Link className={style.link} to="/"> <img src={Howshowicon1.home().path} ></img>{width < 750 ? null : "主页"}</Link>
        <Link className={style.link} to="/about"><img src={Howshowicon2.howshowicon('/about').path}></img>{width < 750 ? null : "关于"}</Link>
        <Link className={style.link} to='/post' ><img src={Howshowicon4.howshowicon('/post').path}></img>{width < 750 ? null : "发帖"}</Link>
        <Link className={style.link} to='/Message' >
          <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <img src={Howshowicon3.howshowicon('/Message').path}></img>{width < 750 ? null : "消息"}
            <div>{noReadNumber}</div>
          </div></Link>
          {width < 750 ? null :<Link className={style.link} to='/setting' ><img src={Howshowicon5.howshowicon('/setting').path}></img> 设置</Link>}
        {localStorageData.jwt ? width < 1000 ? <Link className={`${style.link} ${style.headimgName}`} to={`/userhomepage/${localStorageData.userid}`}><img className={style.headimg} src={localStorageData.headimg}></img><span className={style.userName}>{localStorageData.username}</span></Link> : null : null}
        {localStorageData.jwt ? null : <Link className={style.link} to="/login">{width < 750 ? null : "登录"}</Link>}
      </div>
      {/* 脱离文档流，父元素坍塌问题 */}
      {
        width < 750 ? null :
          <div className={style.leftplace}></div>
      }

    </div >
  )
}
