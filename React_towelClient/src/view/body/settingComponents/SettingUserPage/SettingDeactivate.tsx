/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Backtab from '../../../../components/Backtab';
export default function SettingDeactivate() {
    const [localStorageData, setLocalStorageData] = useState<{ jwt?: string }>({});
    const [inputData, setinputData] = useState({
        user: '',
        email: '',
        code: '',
        password: '',
    })
    const [isShowCode, setiSHowCode] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorageData(JSON.parse(localStorage.getItem('loginData') as string))
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
                    'Authorization': `Bearer ${localStorageData.jwt || ''}`,
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
                    'Authorization': `Bearer ${localStorageData.jwt || ''}`,
                }
            }).then(res => {
                if (res.status === 201) {
                    localStorage.removeItem('loginData')
                    localStorage.removeItem('color-model')
                    localStorage.removeItem('backgroundimg')
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
            <form className='flex flex-col justify-center items-center text-[--fontColor]' onSubmit={(e) => { e.preventDefault() }}>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='text' placeholder='您的账户名' value={inputData.user} onChange={userNameHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='email' placeholder='电子邮件' value={inputData.email} onChange={emailHandle}></input>
                {isShowCode ? <input type='text' className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' placeholder='电子邮件验证码' value={inputData.code} onChange={codeHandle}></input> : null
                }                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='password' placeholder='密码' value={inputData.password} onChange={passwordHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit' value='发送验证码' onClick={sendCodeHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit' onClick={submitHandler}></input>
                <strong className='mt-[10px] text-red-500' >注销账号不同逆</strong>
            </form>
        </>
    )
}
