import React from 'react'
import { Link } from 'react-router-dom'
import useLocaStorage from '../../../hooks/useLocaStorage'
export default function User() {
    const [localStorageData] = useLocaStorage()
    return (
        <div className='w-full flex bg-[--boxColor] rounded-my-rounded-10px p-2 items-center space-x-2'>
            <div className='  '>
                <img src={localStorageData.headimg} className='w-10 h-10 rounded-full'></img>
            </div>
            <Link className='font-bold' to={`/userhomepage/${localStorageData.userid}`}>{localStorageData.username}</Link>
        </div>
    )
}
