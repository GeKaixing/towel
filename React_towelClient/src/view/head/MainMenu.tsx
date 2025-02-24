// @ts-nocheck
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import logo from '../../../public/logo.png'

import { noReadNumbers } from '../../store/noReadNumbers';
import useLocaStorage from '../../hooks/useLocaStorage';
import MainMenuLink from '../../components/MainMenuLink';
import demo0 from '../../assets/static/MainMenuIcon/首页.svg'
import demo1 from '../../assets/static/MainMenuIcon/提示.svg'
import demo2 from '../../assets/static/MainMenuIcon/评论.svg'
import demo3 from '../../assets/static/MainMenuIcon/add.svg'
import demo4 from '../../assets/static/MainMenuIcon/设置.svg'
import demo5 from '../../assets/static/MainMenuIcon/进入.svg'
import demo6 from '../../assets/static/MainMenuIcon/大脑.svg'
import demo7 from '../../assets/static/MainMenuIcon/笔记本.svg'
import demo00 from '../../assets/static/MainMenuIconPitchUp/首页.svg'
import demo11 from '../../assets/static/MainMenuIconPitchUp/提示.svg'
import demo22 from '../../assets/static/MainMenuIconPitchUp/评论.svg'
import demo33 from '../../assets/static/MainMenuIconPitchUp/add.svg'
import demo44 from '../../assets/static/MainMenuIconPitchUp/设置.svg'
import demo55 from '../../assets/static/MainMenuIconPitchUp/进入.svg'
import demo66 from '../../assets/static/MainMenuIconPitchUp/大脑.svg'
import demo77 from '../../assets/static/MainMenuIconPitchUp/笔记本.svg'
import { useLanguage } from '../../store/LanguageContext';
import { useShowAddPost } from '../../store/AddPostContext'
const logo='/logo.png'
export default function MainMenu() {
  const { t } = useLanguage();
  const [, setWidth] = useState(window.innerWidth);
  const [localStorageData] = useLocaStorage();
  const { noReadNumber } = useContext(noReadNumbers);
  const router = useLocation();
  const { setShow } = useShowAddPost();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const selectImgIcon = useCallback((iconActive, icon, url = '/') => {
    return router.pathname === url ? icon : iconActive;
  }, [router])
  const selectShow=()=>{
    setShow(true); 
  }
  return (

    <div className=' flex 
        md:mr-4 md:mt-2 md:ml-4 md:w-20 md:h-[80%] md:py-2 md:flex-col 
        max-md:left-[50%] max-md:translate-x-[-50%] 
        md:bg-transparent
        lg:w-[20%] lg:ml-[10%]
        px-2 fixed md:left-0 max-md:bottom-0  
        justify-around w-full items-center rounded-my-rounded-10px
        bg-[--boxColor]
        lg:bg-transparent
       '>
      <div className='hidden md:block md:w-10 md:h-10
          lg:w-20 lg:h-20
          mb-2
        '>
        <img src={logo} alt="Logo" className='' />
      </div>
      <MainMenuLink to="/" src={
        selectImgIcon(demo0, demo00, '/')} text={t('home')} />
      {/* <MainMenuLink className='hidden md:block' to="/about" src={icons[1].getIcon('/about').path} text='关于' /> */}
      <MainMenuLink to="/ai" src={selectImgIcon(demo6, demo66, '/ai')} text={t('ai')} />
      <MainMenuLink src={selectImgIcon(demo3, demo33, '/post')} text={t('add')} onClick={selectShow} />
      <MainMenuLink className='relative' to="/Message" src={selectImgIcon(demo2, demo22, '/Message')} text={t('message')}>
      <div className='hidden lg:block absolute -right-6 font-[--assistantColor]'>{noReadNumber}</div> 
       </MainMenuLink> 
       {/* <MainMenuLink to="https://blog.gekaixing.top/" target={'_blank'} src={selectImgIcon(demo7, demo77, '/Message')} text={t('blog')}/>  */}
       <MainMenuLink className='hidden md:block' to="/setting" src={selectImgIcon(demo4, demo44, '/setting')} text={t('setting')} /> 
      {localStorageData.jwt &&
        <Link to={`/userhomepage/${localStorageData.userid}`} className={'lg:flex lg:flex-row lg:items-center '}>
          <div className='w-10 h-10 rounded-full max-lg:m-0 object-cover lg:mr-10 flex justify-center items-center'>
            <img className='w-10 h-10 rounded-full max-md:w-[26px] max-md:h-[26px]' src={localStorageData.headimg} ></img>
          </div>
          <div className='max-lg:hidden lg:block text-lg font-bold text-[--fontColor]'>{localStorageData.username}</div>
        </Link>
      }
      {!localStorageData.jwt && <MainMenuLink to="/login" src={selectImgIcon(demo5, demo55, '/login')} text={t('login')} />} 
    </div>

  );
}
