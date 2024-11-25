import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLocaStorage from '../../../hooks/useLocaStorage'
import Premium from '../../../components/Premium'
export default function User() {
    const [localStorageData] = useLocaStorage()
    const [isShowPremium, setShowPremium] = useState(false)
    return (
        <div className='text-[--fontColor] w-full flex bg-[--boxColor] hover:bg-[--boxHoverColor] rounded-my-rounded-10px p-2 items-center space-x-2'>
            <div className='flex items-center  space-x-2'>
                <img src={localStorageData.headimg} className='w-10 h-10 rounded-full'></img>
                <Link className='font-bold' to={`/userhomepage/${localStorageData.userid}`}>{localStorageData.username}</Link>
            </div>
            <div className={`w-20 h-8  ${localStorageData.premium?'bg-[--assistantColor]':'bg-gray-300'} rounded-my-rounded-10px flex justify-center items-center cursor-pointer`} onClick={() => { setShowPremium(i => !i) }}>Premium</div>
            {isShowPremium && <Premium setShowPremium={setShowPremium}></Premium>}
        </div>
    )
}
