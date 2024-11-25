import React, { useState } from 'react'
// import style from './UserHomePage.module.css'
import UsePost from './UsePost'
import UserComment from './UserComment'
import UserReply from './UserReply'
import { useNavigate, useParams } from 'react-router-dom'
import { getSocket } from '../../../../socket/socket'
import useLocalStorage from '../../../../hooks/useLocaStorage'
export default function UserHomePage() {
  /* 用户的详情页  */
  // 选择组件 用于切换页面使用
  const [seletcpage, setseletcpage] = useState('')
  const Navigate = useNavigate()
  const params = useParams()  
  // const [localStorageData, setLocalStorage] = useState({})
  // useEffect(() => {
  //   if (localStorage.getItem('loginData')) {
  //     setLocalStorage(JSON.parse(localStorage.getItem('loginData')))
  //   }
  // }, [])
 const[localStorageData]=useLocalStorage()
  // 切换组件函数 用switch实现
  const rendercompents = () => {
    switch (seletcpage) {
      case "UserArticle": return <UsePost localStorageData={localStorageData}></UsePost>
      case "UserComment": return <UserComment localStorageData={localStorageData}></UserComment>
      case "UserReply": return <UserReply localStorageData={localStorageData}></UserReply>
      default: return <UsePost localStorageData={localStorageData}></UsePost>
    }
  }
  // 登出账号的函数
  const closeAnAccountHanlder = () => {
    localStorage.removeItem("loginData")
    Navigate("/", { replace: true })
    window.location.reload();
    const socket = getSocket()
    socket.disconnect()
  }
  return (
    <div className='w-full p-2'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center  '>
          <div className='w-10  h-10 rounded-full'>
            <img src={localStorageData.headimg} className='w-10  h-10 rounded-full' alt="头像"></img>
          </div>
          <p className='text-[--fontColor] font-bold cursor-pointer'> {localStorageData.username}</p>
        </div>
        <div className='flex space-x-2'>
          <div className='text-[--assistantColor] cursor-pointer' onClick={() => Navigate("/setting")}>设置</div> 
          {localStorageData.userid===params.id&& <div className='text-[--fontColor] cursor-pointer' onClick={closeAnAccountHanlder}>登出</div>}
        </div>
      </div>
      <div className='text-[--fontColor] flex justify-between mt-2 mb-2'>
        <div className='hover:text-[--assistantColor] cursor-pointer' onClick={() => { setseletcpage('UserArticle') }}>文章</div>
        <div className='hover:text-[--assistantColor] cursor-pointer' onClick={() => { setseletcpage('UserComment') }}>评论</div>
        <div className='hover:text-[--assistantColor] cursor-pointer' onClick={() => { setseletcpage('UserReply') }}>回复</div>
      </div >
      {rendercompents()}
    </div>
  )
}
