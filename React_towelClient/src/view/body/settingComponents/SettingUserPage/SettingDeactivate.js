/* eslint-disable */
import React, { useState, useEffect } from 'react'
import style from './SettingDeactivate.module.css'
import axios from 'axios';
export default function SettingDeactivate() {
    const [localStorageData, setLocalStorageData] = useState({});
    const [inputData, setinputData] = useState({
        user: '',
        email: '',
        code: '',
        password: '',
    })
    const [isShowCode, setiSHowCode] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [])

    const emailHandle = (e) => {
        setinputData({ ...inputData, email: e.target.value })
    }
    const userNameHandle = (e) => {
        setinputData({ ...inputData, user: e.target.value })
    }
    const codeHandle = (e) => {
        setinputData({ ...inputData, code: e.target.value })
    }
    const passwordHandle = (e) => {
        setinputData({ ...inputData, password: e.target.value })
    }
    const sendCodeHandle = () => {
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        if (inputData.user === "" && emailPattern.test(inputData.email)) {
            alert("请输入用户名或者电子邮件")
        } else {
            axios({
                url: 'http://127.0.0.1:4000/deactivatecode',
                method: 'post',
                data: {
                    data: {
                        username: inputData.user,
                        email: inputData.email,
                    }
                },
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(res => {
                if (res.status === 201) {
                    alert('您的验证码已经到达邮件,注意5分钟后过期')
                    setiSHowCode(!isShowCode)
                }
            }).catch(() => {
                alert('用户名或邮箱错误')
            })
        }
    }
    const submitHandler = () => {
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        if (inputData.user && emailPattern.test(inputData.email) && inputData.code && inputData.password) {
            axios({
                url: 'http://127.0.0.1:4000/deactivateaccount',
                method: 'post',
                data: {
                    data: {
                        username: inputData.user,
                        email: inputData.email,
                        password: inputData.password,
                        code: inputData.code
                    }
                },
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(res => {
                if (res.status === 201) {
                    localStorage.clear('loginData')
                    localStorage.clear('color-model')
                    localStorage.clear('backgroundimg')
                    window.location.href = '/';
                }
            }).catch(() => {
                alert('用户名或邮箱或验证码错误')
            })
        } else {
            alert('别空着')
        }

    }
    return (
        <>
            <Backtab text='设置' href='/setting'></Backtab>
     
        <div className={style.SettingDeactivate}>
            <form className={style.SettingDeactivateForm} onSubmit={(e) => { e.preventDefault() }}>
                <input type='text' placeholder='您的账户名' className={style.SettingUserForgetPageName} value={inputData.user} onChange={userNameHandle}></input>
                <input type='email' placeholder='电子邮件' value={inputData.email} onChange={emailHandle}></input>
                {isShowCode ? <input type='text' placeholder='电子邮件验证码' value={inputData.code} onChange={codeHandle}></input> : null
                }                <input type='password' placeholder='密码' value={inputData.password} onChange={passwordHandle}></input>
                <input type='submit' className={style.SettingUserForgetPageFormSendCode} value='发送验证码' onClick={sendCodeHandle}></input>
                <input type='submit' className={style.SettingUserForgetPageFormSubmitBotton} onClick={submitHandler}></input>
                <strong style={{ color: "red" }}>注销账号不同逆</strong>
            </form>
        </div>
        </>
    )
}
