/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Backtab from '../../../../components/Backtab'
import { useLanguage } from '../../../../store/LanguageContext';
import Widget from '../../../../cloudflare/cloudflare';
export default function SettingUserForgetPage() {
    const { t } = useLanguage();
    const [, setLocalStorageData] = useState({});
    const [inputData, setinputData] = useState({
        user: '',
        email: '',
        code: '',
        password: '',
        password2: ''
    })
    const [isShowCode, setiSHowCode] = useState(false)
    const [showpassword, setshowpassword] = useState(false)
    const [showpassword2, setshowpassword2] = useState(false)



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
    const password2Handle = (e) => {
        setinputData({ ...inputData, password2: e.target.value })
    }
    const sendCodeHandle = () => {
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        if (inputData.user === "" && emailPattern.test(inputData.email)) {
            alert("请输入用户名或者电子邮件")
        } else {
            axios({
                url: 'http://127.0.0.1:4000/forgetpasswordverificationcode',
                method: 'post',
                data: {
                    data: {
                        username: inputData.user,
                        email: inputData.email,
                    }
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
        const password = inputData.password === inputData.password2
        if (password) {
            const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
            if (inputData.user && emailPattern.test(inputData.email) && inputData.code && inputData.password && inputData.password2) {
                axios({
                    url: 'http://127.0.0.1:4000/forgetpassword',
                    method: 'post',
                    data: {
                        data: {
                            username: inputData.user,
                            email: inputData.email,
                            password: inputData.password,
                            code: inputData.code
                        }
                    }
                }).then(res => {
                    console.log(res.data)
                }).catch(() => {
                    alert('用户名或邮箱或验证码错误')
                })
            } else {
                alert('别空着')
            }
        } else {
            alert('两次密码不对')
        }
    }
    return (
        <>
            <Backtab text={t('setting')} href='/setting'></Backtab>
            <div className='text-[--fontColor]'>
                <form className='flex flex-col justify-center items-center relative' onSubmit={(e) => { e.preventDefault() }}>
                    <input className='w-[300px] h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='text' placeholder={t('name')} value={inputData.user} onChange={userNameHandle}></input>
                    <input className='w-[300px] h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='email' placeholder={t('email')} value={inputData.email} onChange={emailHandle}></input>
                    {isShowCode ? <input className='w-[300px] h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='code' placeholder={t('Verification')} value={inputData.code} onChange={codeHandle}></input> : null}
                    <input className='w-[300px] h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type={showpassword ? 'text' : 'password'} placeholder={t('newPassword')} value={inputData.password} onChange={passwordHandle}></input>
                    <input className='w-[300px] h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type={showpassword2 ? 'text' : 'password'} placeholder={t('enterPassword')} value={inputData.password2} onChange={password2Handle}></input>

                    <input className='w-24 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit' value={t('SendVerificationCode')} onClick={sendCodeHandle}></input>
                    <input className='w-24 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit' value={t('submit')} onClick={submitHandler} ></input>
                        <Widget></Widget>
                </form>

            </div>
        </>
    )
}
