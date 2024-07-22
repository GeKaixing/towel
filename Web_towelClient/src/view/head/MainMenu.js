import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { noReadNumbers } from '../../store/noReadNumbers';
import useLocaStorage from '../../hooks/useLocaStorage';
import MainMenuLink from '../../components/MainMenuLink';
import demo0 from '../../assets/static/MainMenuIcon/首页.svg'
import demo1 from '../../assets/static/MainMenuIcon/提示.svg'
import demo2 from '../../assets/static/MainMenuIcon/评论.svg'
import demo3 from '../../assets/static/MainMenuIcon/添加.svg'
import demo4 from '../../assets/static/MainMenuIcon/设置.svg'
import demo5 from '../../assets/static/MainMenuIcon/进入.svg'
import demo00 from '../../assets/static/MainMenuIconPitchUp/首页.svg'
import demo11 from '../../assets/static/MainMenuIconPitchUp/提示.svg'
import demo22 from '../../assets/static/MainMenuIconPitchUp/评论.svg'
import demo33 from '../../assets/static/MainMenuIconPitchUp/添加.svg'
import demo44 from '../../assets/static/MainMenuIconPitchUp/设置.svg'
import demo55 from '../../assets/static/MainMenuIconPitchUp/进入.svg'

export default function MainMenu() {
  const [width, setWidth] = useState(window.innerWidth);
  const [localStorageData] = useLocaStorage();
  const { noReadNumber } = useContext(noReadNumbers);
  const router = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  class IconPath {
    constructor(path) {
      this.path = process.env.PUBLIC_URL + path;
    }
  }

  class HowShowIcon {
    constructor(icon = demo0, iconActive = demo00) {
      this.icon = new IconPath(icon);
      this.iconActive = new IconPath(iconActive);
    }

    getIcon(path = '/') {
      return router.pathname === path ? this.iconActive : this.icon;
    }

    home() {
      const pathname = router.pathname.split('/');
      return (router.pathname === '/' || pathname[1] === 'homepage') ? this.iconActive : this.icon;
    }
  }

  const icons = [
    new HowShowIcon(),
    new HowShowIcon(demo1, demo11),
    new HowShowIcon(demo2, demo22),
    new HowShowIcon(demo3, demo33),
    new HowShowIcon(demo4, demo44),
    new HowShowIcon(demo5, demo55),
  ];
  return (
    <>
      <div className=' flex md:mr-4 md:mt-2 md:ml-4 md:w-20 md:h-[80%] md:py-2   md:flex-col 
        lg:w-[360px]  lg:bg-transparent
        px-2 fixed md:left-0 max-md:bottom-2  
       justify-around w-full items-center rounded-my-rounded-10px
     
       '>
        <div className='hidden md:block md:w-10 md:h-10
          lg:w-20 lg:h-20
        '>
          {/* global process */}
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className='' />
        </div>
        <MainMenuLink to="/" src={icons[0].home().path} text='主页' />
        <MainMenuLink to="/about" src={icons[1].getIcon('/about').path} text='关于' />
        <MainMenuLink to="/post" src={icons[3].getIcon('/post').path} text='发帖' />
        <MainMenuLink to="/Message" src={icons[2].getIcon('/Message').path} text='消息'>
          <div>{noReadNumber}</div>
        </MainMenuLink>
        <MainMenuLink to="/setting" src={icons[4].getIcon('/setting').path} text='设置' />
        {localStorageData.jwt &&
          <Link to={`/userhomepage/${localStorageData.userid}`} className={'lg:flex lg:flex-row lg:items-center '}>
            <div className='w-10 h-10 rounded-full max-lg:m-0 object-cover lg:mr-10'>
              <img className='w-10 h-10 rounded-full' src={localStorageData.headimg} ></img>
            </div>
            <div className='max-lg:hidden lg:block'>{localStorageData.username}</div>
          </Link>
        }
        {!localStorageData.jwt && <MainMenuLink to="/login" src={icons[5].getIcon('/login').path} text='登录' />}

        {/* {!localStorageData.jwt && <MainMenuLink to="/login" text='登录' />} */}
      </div>
      <div className='max-md:hidden md:mr-4 md:ml-4 md:mt-2 md:w-20 md:h-[auto] md:py-2
      lg:w-[376px]   border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-r-2
      '></div>
    </>
  );
}
