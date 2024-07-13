import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { noReadNumbers } from '../../store/noReadNumbers';
import useLocaStorage from '../../hooks/useLocaStorage';
import MainMenuLink from '../../components/MainMenuLink';

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
    constructor(icon = '/static/MainMenuIcon/首页.svg', iconActive = '/static/MainMenuIconPitchUp/首页.svg') {
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
    new HowShowIcon('/static/MainMenuIcon/提示.svg', '/static/MainMenuIconPitchUp/提示.svg'),
    new HowShowIcon('/static/MainMenuIcon/评论.svg', '/static/MainMenuIconPitchUp/评论.svg'),
    new HowShowIcon('/static/MainMenuIcon/添加.svg', '/static/MainMenuIconPitchUp/添加.svg'),
    new HowShowIcon('/static/MainMenuIcon/设置.svg', '/static/MainMenuIconPitchUp/设置.svg'),
  ];

  return (
    <div className='w-[150px]  flex justify-center max-sm:hidden'>
      <div className='flex fixed flex-col justify-center mt-10 max-sm:hidden'>
        <div className='flex justify-center items-center text-7xl '>
          {/* global process */}
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className='font-[4.5rem]' />
        </div>
        <MainMenuLink to="/" src={icons[0].home().path} text='主页' />
        <MainMenuLink to="/about" src={icons[1].getIcon('/about').path} text='关于' />
        <MainMenuLink to="/post" src={icons[3].getIcon('/post').path} text='发帖' />
        <MainMenuLink to="/Message" src={icons[2].getIcon('/Message').path} text='消息'>
          <div>{noReadNumber}</div>
        </MainMenuLink>
        <MainMenuLink className='max-md:hidden' to="/setting" src={icons[4].getIcon('/setting').path} text='设置' />
        {localStorageData.jwt && width < 1000 ? (
          <MainMenuLink to={`/userhomepage/${localStorageData.userid}`} src={localStorageData.headimg} >
            <span className='text-sm grow-1 font-bold'>{localStorageData.username}</span>
          </MainMenuLink>
        ) : null}
        {!localStorageData.jwt && <MainMenuLink to="/login" text='登录' />}
      </div>
    </div>
  );
}
