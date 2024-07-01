import React, { useEffect, useState } from 'react'
import style from './SettingAccount.module.css'
import axios from 'axios';
export default function SettingAccount() {
    const [responseData, setResponseData] = useState({})
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            const localStorageData = JSON.parse(localStorage.getItem('loginData'));
            axios({
                url: `http://127.0.0.1:4000/userinfo/${localStorageData.userid}`,
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(response => {
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])
    return (
        <div className={style.SettingAccount}>
            <img src={responseData.headimg} className={style.headimg}></img>
            <p><strong>id</strong></p>
            <p>{responseData._id}</p>
            <p><strong>用户名</strong></p>
            <p>{responseData.username}</p>
            <p><strong>电子邮件</strong></p>
            <p>{responseData.email}</p>
            <p><strong>电话号码</strong></p>
            <p>{responseData.iphoneNumber===undefined?'无':responseData.iphoneNumber}</p>
            <p><strong>生日</strong></p>
            <p>{responseData.birthday===undefined?'无':responseData.birthday}</p>
        </div>
    )
}
