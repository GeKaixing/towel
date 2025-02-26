import React from 'react'
import { Link } from 'react-router-dom'
import headimgIcon from '../../../assets/static/otherIcon/head-img.svg'
import useLocaStorage from '../../../hooks/useLocaStorage'
import { useLanguage } from '../../../store/LanguageContext'
// import logoPng from '../../../../public/logo.png'
const logoPng='/logo.png'
export default function Follow() {

    const [localStorageData] = useLocaStorage()
    const { t } = useLanguage();
    return (
        <div className='flex flex-col items-center w-full 
        max-md:bored-[boxColor] max-md:border-t-2'>
            <div className='text-[--fontColor] max-md:self-start'>{t('followRecommend')}</div>
            <div className='flex  flex-col px-2 justify-between w-full space-y-2 '>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none object-cover'><img src={headimgIcon}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'><div className='px-2 h-8 flex justify-center items-center bg-[--hostColor] text-white rounded-[10px]'>{t('follow')}</div></div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={logoPng} ></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className="text-[--fontColor] ">{localStorageData.username}</Link><div className='cursor-pointer font-bold'><div className='px-2 h-8 flex justify-center items-center bg-[--hostColor] text-white rounded-[10px]'>{t('follow')}</div></div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={logoPng}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'><div className='px-2 h-8 flex justify-center items-center bg-[--hostColor] text-white rounded-[10px]'>{t('follow')}</div></div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={logoPng}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'><div className='px-2 h-8 flex justify-center items-center bg-[--hostColor] text-white rounded-[10px]'>{t('follow')}</div></div></div>
            </div>
            <div className='cursor-pointer text-[--fontColor]'>{t('more')}...</div>
        </div>
    )
}
