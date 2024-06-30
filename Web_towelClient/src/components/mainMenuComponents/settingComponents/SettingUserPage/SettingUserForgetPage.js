/* eslint-disable */
import React, { useState, useEffect } from 'react'
import style from './SettingUserForgetPage.module.css'
export default function SettingUserForgetPage() {
    const [localStorageData, setLocalStorageData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [])
    return (
        <div className={style.SettingUserForgetPage}>
            <form className={style.SettingUserForgetPageForm} onSubmit={(e) => { e.preventDefault() }}>
                <input type='text' placeholder='您的账户名' className={style.SettingUserForgetPageName}></input>
                <input type='email' placeholder='电子邮件'></input>
                <input type='text' placeholder='电子邮件验证码'></input>
                <input type='password' placeholder='新密码'></input>
                <input type='password' placeholder='确认密码密码'></input>
                <input type='submit' className={style.SettingUserForgetPageFormSendCode} value='发送验证码'></input>
                <input type='submit'className={style.SettingUserForgetPageFormSubmitBotton} ></input>
            </form>
        </div>
    )
}
