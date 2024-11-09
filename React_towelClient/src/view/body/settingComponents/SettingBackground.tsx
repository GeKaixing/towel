import React, { useEffect, useState } from 'react'
import { useSelectLightorDark } from '../../../store/selectLightorDark'
import { useNavigate } from "react-router-dom";

export default function SettingBackground() {
    //暗黑模式 
    const { colorModel, setColorModel } = useSelectLightorDark()
    const [colorModeldata, setColorModeldata] = useState<string|null>(null)
    const navigate = useNavigate()
    const autoColorHandler = () => {
        localStorage.setItem('backgroundimg','')
        localStorage.setItem('color-model', 'system')
        setColorModel(!colorModel)
       
    }
    const selectLightHandler = () => {
        if(localStorage.getItem('color-model')==='bing'){ location.reload()}
            localStorage.setItem('backgroundimg','')
            localStorage.setItem('color-model', 'light')
            setColorModel(!colorModel)
    }
    const selectDarkHandler = () => {
        if(localStorage.getItem('color-model')==='bing'){ location.reload()}  
            localStorage.setItem('backgroundimg','')
            localStorage.setItem('color-model', 'dark')
            setColorModel(!colorModel)
    }
    const backgroundimgHandler = () => {
        navigate('/setting/backgroundimg', { replace: true })
    }
    useEffect(() => {
        const colorModeldata = localStorage.getItem('color-model');
        setColorModeldata(colorModeldata)
    }, [colorModel])
    return (
        <div className='flex felx-col gap-2 mt-2 text-center'>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] text-[--fontColor] flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={backgroundimgHandler}>背景{colorModeldata === 'bing' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] text-[--fontColor] flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={autoColorHandler}>跟随系统{colorModeldata === 'system' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] text-[--fontColor] flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectLightHandler}>白天{colorModeldata === 'light' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] text-[--fontColor] flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectDarkHandler}>晚上{colorModeldata === 'dark' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
        </div>
    )
}
