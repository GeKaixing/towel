/* eslint-disable */
import React, { useState, useEffect } from 'react'
import style from './SettingDeactivate.module.css'
export default function SettingDeactivate() {
    const [localStorageData, setLocalStorageData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [])
    return (
        <div className={style.SettingDeactivate}>
            <form className={style.SettingDeactivateForm} onSubmit={(e) => { e.preventDefault() }}>
                <input type='text' placeholder='您的账户' className={style.SettingUserForgetPageName}></input>
                <input type='email' placeholder='电子邮件'></input>
                <input type='text' placeholder='电子邮件验证码'></input>
                <input type='password' placeholder='密码'></input>
                <input type='submit' className={style.SettingUserForgetPageFormSendCode} value='发送验证码'></input>
                <input type='submit' className={style.SettingUserForgetPageFormSubmitBotton} ></input>
                <strong style={{color:"red"}}>注销账号不同逆</strong>
            </form>
        </div>
    )
}
