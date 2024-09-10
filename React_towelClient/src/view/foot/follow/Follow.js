import React from 'react'
import { Link } from 'react-router-dom'
import headimgIcon from '../../../assets/static/otherIcon/head-img.svg'
import useLocaStorage from '../../../hooks/useLocaStorage'
export default function Follow() {
    const [localStorageData] = useLocaStorage()
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='text-[--fontColor] '>推荐关注</div>
            <div className='flex  flex-col px-2 justify-between w-full space-y-2 '>
                {/* global process */}
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxColor] hover:rounded-[10px]'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none object-cover'><img src={headimgIcon}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'>关注</div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxColor] hover:rounded-[10px]'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={process.env.PUBLIC_URL + '/logo.png'} ></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className="text-[--fontColor] ">{localStorageData.username}</Link><div className='cursor-pointer font-bold'>关注</div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxColor] hover:rounded-[10px]'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={process.env.PUBLIC_URL + '/logo.png'}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'>关注</div></div>
                <div className='flex flex-row justify-between w-full text-[--fontColor] hover:bg-[--boxColor] hover:rounded-[10px]'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap rounded-full border-none overflow-cover'><img src={process.env.PUBLIC_URL + '/logo.png'}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div className='cursor-pointer font-bold'>关注</div></div>
            </div>
            <div className='cursor-pointer text-[--fontColor]'>更多...</div>
        </div>
    )
}
