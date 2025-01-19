import React, { useState } from 'react'
import UsePost from './UsePost'
import UserComment from './UserComment'
import UserReply from './UserReply'
import { useNavigate, useParams } from 'react-router-dom'
import { getSocket } from '../../../../socket/socket'
import useLocalStorage from '../../../../hooks/useLocaStorage'
import { useLanguage } from '../../../../store/LanguageContext'
import moretwo from "../../../../assets/static/otherIcon/more-two.svg"
export default function UserHomePage() {
  /* 用户的详情页  */
  // 选择组件 用于切换页面使用
  const [seletcpage, setseletcpage] = useState('UserArticle')
  const Navigate = useNavigate()
  const params = useParams()
  // const [localStorageData, setLocalStorage] = useState({})
  // useEffect(() => {
  //   if (localStorage.getItem('loginData')) {
  //     setLocalStorage(JSON.parse(localStorage.getItem('loginData')))
  //   }
  // }, [])
  const [localStorageData] = useLocalStorage()
  const { t } = useLanguage();
  // 切换组件函数 用switch实现
  const rendercompents = () => {
    switch (seletcpage) {
      case "UserArticle": return <UsePost localStorageData={localStorageData}></UsePost>
      case "UserComment": return <UserComment localStorageData={localStorageData}></UserComment>
      case "UserReply": return <UserReply localStorageData={localStorageData}></UserReply>
      default: return <UsePost localStorageData={localStorageData}></UsePost>
    }
  }
  const isfocushandler = (params: string): boolean => {
    return seletcpage === params
  }
  // 登出账号的函数
  const closeAnAccountHanlder = () => {
    localStorage.removeItem("loginData")
    Navigate("/", { replace: true })
    window.location.reload();
    const socket = getSocket()
    socket.disconnect()
  }
  const [isShow, serShow] = useState(false);
  //点击显示更多的函数
  const showMoreHandler = () => {
    serShow(!isShow)
  }

  //复制当前网页url到剪贴板的函数
  function copyCurrentUrl() {
    const url = window.location.href; // 获取当前页面的 URL
    navigator.clipboard.writeText(url) // 将 URL 写入剪贴板
      .then(() => {
        alert('URL 已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  }
  return (
    <div className='w-full '>
      <div className='flex flex-col  w-full relative'>

        <div className='bg-[--hostColor] w-full h-36 absolute top-0 left-0 -z-50'></div>
        <div className='w-full h-24 '></div>

        <div className='flex flex-col px-2'>
          <div className='flex w-full flex-row justify-between'>
            <img src={localStorageData.headimg} className='w-20 h-20 rounded-full bg-white' alt="头像"></img>
            <div className='flex space-x-2 self-end relative'>
              <img src={moretwo} alt='更多' onClick={showMoreHandler}></img>
              {isShow &&
                <div className='absolute right-0 top-6 border-[--boxColor] border-solid border-2  rounded-lg p-2 w-auto bg-white'>
                  <div onClick={copyCurrentUrl}>{t('share')}</div>
                  <hr></hr>
                  <div className='text-[--assistantColor] cursor-pointer text-nowrap' onClick={() => Navigate("/setting")}>{t('setting')}</div>
                  <hr></hr>
                  {localStorageData.userid === params.id && <div className='text-[--fontColor] cursor-pointer text-nowrap' onClick={closeAnAccountHanlder}>{t('logout')}</div>}
                </div>}
            </div>
          </div>
          <div className='flex flex-col  text-[--fontColor]'>
            <p className=' font-bold cursor-pointer text-2xl'> {localStorageData.username}</p>
            <p>example@gmail.com</p>
          </div>
        </div>
      </div>

      <div className='text-[--fontColor] flex justify-between mt-2 mb-2 px-2'>
        <div className={`hover:text-[--assistantColor] cursor-pointer font-bold ${isfocushandler('UserArticle')?'text-[--hostColor]':null}`}  onClick={() => { setseletcpage('UserArticle') }}>{t('post')}</div>
        <div className={`hover:text-[--assistantColor] cursor-pointer font-bold ${isfocushandler('UserComment')?'text-[--hostColor]':null}`}  onClick={() => { setseletcpage('UserComment') }}>{t('comment')}</div>
        <div className={`hover:text-[--assistantColor] cursor-pointer font-bold ${isfocushandler('UserReply')?'text-[--hostColor]':null}`}  onClick={() => { setseletcpage('UserReply') }}>{t('reply')}</div>
      </div >
      <div className='px-2'>
        {rendercompents()}
      </div>
    </div>
  )
}
