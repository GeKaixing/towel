/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Backtab from '../../../../components/Backtab';
import { useLanguage } from '../../../../store/LanguageContext';
export default function SettingDeactivate() {
    const {t}=useLanguage();
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
            alert(t('Please_enter_your_username_or_email_address'))
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
                    alert(t('minutes5'))
                    setiSHowCode(!isShowCode)
                }
            }).catch(() => {
                alert(t('incorrect'))
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
            <Backtab text={t('setting')} href='/setting'></Backtab>
            <form className='flex flex-col justify-center items-center text-[--fontColor]' onSubmit={(e) => { e.preventDefault() }}>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='text' placeholder={t('name')} value={inputData.user} onChange={userNameHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='email' placeholder={t('email')} value={inputData.email} onChange={emailHandle}></input>
                {isShowCode ? <input type='text' className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' placeholder={t('Verification')} value={inputData.code} onChange={codeHandle}></input> : null
                }                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='password' placeholder={t('password')} value={inputData.password} onChange={passwordHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit' value={t('SendVerificationCode')} onClick={sendCodeHandle}></input>
                <input className='w-60 h-6 mt-[10px] bg-[--boxColor] border-none font-[--fontColor]' type='submit'  value={t('submit')} onClick={submitHandler}></input>
                <strong className='mt-[10px] text-red-500' >{t('Cancellation_of_account_is_different')}</strong>
            </form>
        </>
    )
}
