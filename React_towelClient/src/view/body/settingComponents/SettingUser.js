import React from 'react'
import style from './SettingUser.module.css'
import { useNavigate } from "react-router-dom";
export default function SettingUser() {
    const navigate = useNavigate();
    return (
        <div className={style.SettingUser}>
            <div onClick={()=>navigate('/setting/auth',{replace: true})}>towel权限</div>
            <div onClick={()=>navigate('/setting/account',{replace: true})}>账号信息</div>
            <div onClick={()=>navigate('/setting/forget',{replace: true})}>忘记密码</div>
            <div onClick={()=>navigate('/setting/deactivate',{replace: true})}>注销账号</div>
        </div>

    )
}
