import React, { useEffect, useState } from 'react'
import { useSelectLightorDark } from '../../../store/selectLightorDark'
import { useNavigate } from "react-router-dom";

export default function SettingMenu() {
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
        <div className='flex flex-wrap gap-2 mt-2 text-center items-center text-[--fontColor]'>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={backgroundimgHandler}>背景{colorModeldata === 'bing' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={autoColorHandler}>跟随系统{colorModeldata === 'system' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectLightHandler}>白天{colorModeldata === 'light' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectDarkHandler}>晚上{colorModeldata === 'dark' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/auth',{replace: true})}>towel权限</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/account',{replace: true})}>账号信息</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/forget',{replace: true})}>忘记密码</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/deactivate',{replace: true})}>注销账号</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/orderform',{replace: true})}>订单</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/contactme',{replace: true})}>联系我</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/setting/contactme',{replace: true})}>客服</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={()=>navigate('/about',{replace: true})}>关于</div>
        </div>
    )
}
