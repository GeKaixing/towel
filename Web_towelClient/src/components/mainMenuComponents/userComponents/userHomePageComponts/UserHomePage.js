import React, { useState, useEffect } from 'react'
import style from './UserHomePage.module.css'
import UserArticle from './UserArticle'
import UserComment from './UserComment'
import UserReply from './UserReply'
import { useNavigate } from 'react-router-dom'
import { getSocket } from '../../../../socket/socket'
export default function UserHomePage() {
  /* 用户的详情页  */
  // 选择组件 用于切换页面使用
  const [seletcpage, setseletcpage] = useState('')
  const Navigate = useNavigate()
  const [localStorageData, setLocalStorage] = useState({})
  useEffect(() => {
    if (localStorage.getItem('loginData')) {
      setLocalStorage(JSON.parse(localStorage.getItem('loginData')))
    }
  }, [])
  // 切换组件函数 用switch实现
  const rendercompents = () => {
    switch (seletcpage) {
      case "UserArticle": return <UserArticle localStorageData={localStorageData}></UserArticle>
      case "UserComment": return <UserComment localStorageData={localStorageData}></UserComment>
      case "UserReply": return <UserReply localStorageData={localStorageData}></UserReply>
      default: return <UserArticle localStorageData={localStorageData}></UserArticle>
    }
  }
  // 注销账号的函数
  const closeAnAccountHanlder = () => {
    localStorage.removeItem("loginData")
    Navigate("/", { replace: true })
    window.location.reload();
    const socket = getSocket()
    socket.disconnect()
  }
  return (
    <div className={style.userhomepage}>
      <div className={style.userhomepageHead}>
        <div className={style.userhomepageHeadimgAndName}>
          <div className={style.headimg}>
            <img src={localStorageData.headimg} className={style.img} alt="头像"></img>
          </div>
          <p className={style.name}> {localStorageData.username}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {window.innerWidth < 750 ? <div onClick={() => Navigate("/setting")}>设置</div> : null}
          <div className={style.loginout} onClick={closeAnAccountHanlder}>登出</div>
        </div>
      </div>
      <div className={style.userhistory}>
        <div onClick={() => { setseletcpage('UserArticle') }}>文章</div>
        <div onClick={() => { setseletcpage('UserComment') }}>评论</div>
        <div onClick={() => { setseletcpage('UserReply') }}>回复</div>
      </div>
      {rendercompents()}
    </div>
  )
}
