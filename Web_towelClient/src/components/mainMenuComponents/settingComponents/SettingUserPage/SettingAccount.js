import React, { useEffect, useState } from 'react'
import style from './SettingAccount.module.css'
export default function SettingAccount() {
    const [localStorageData, setLocalStorageData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [])
    return (
        <div className={style.SettingAccount}>
            <p><strong>id</strong></p>
            <p>{localStorageData.userid}</p>
            <p><strong>用户名</strong></p>
            <p>{localStorageData.username}</p>
            <p><strong>电子邮件</strong></p>
            <p>example@gmail.com</p>
            <p><strong>电话号码</strong></p>
            <p>123-4567-8900</p>
            <p><strong>生日</strong></p>
            <p>无</p>
        </div>
    )
}
