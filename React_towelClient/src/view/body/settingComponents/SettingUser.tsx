import React from 'react'
import { useNavigate } from "react-router-dom";
export default function SettingUser() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-2 mt-2 text-center'>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] font-[--fontColor] flex flex-col justify-between items-center hover:bg-[boxHoverColor]' onClick={()=>navigate('/setting/auth',{replace: true})}>towel权限</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] font-[--fontColor] flex flex-col justify-between items-center hover:bg-[boxHoverColor]' onClick={()=>navigate('/setting/account',{replace: true})}>账号信息</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] font-[--fontColor] flex flex-col justify-between items-center hover:bg-[boxHoverColor]' onClick={()=>navigate('/setting/forget',{replace: true})}>忘记密码</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor] font-[--fontColor] flex flex-col justify-between items-center hover:bg-[boxHoverColor]' onClick={()=>navigate('/setting/deactivate',{replace: true})}>注销账号</div>
        </div>

    )
}
