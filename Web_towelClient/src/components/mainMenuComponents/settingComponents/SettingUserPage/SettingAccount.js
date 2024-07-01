import React, { useEffect, useState } from 'react'
import style from './SettingAccount.module.css'
import axios from 'axios';
export default function SettingAccount() {
    const [responseData, setResponseData] = useState({})
    const [localStorageData, setLocalStorageData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            const localStorageData = JSON.parse(localStorage.getItem('loginData'));
            setLocalStorageData(localStorageData)
            axios({
                url: `http://127.0.0.1:4000/userinfo/${localStorageData.userid}`,
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(response => {
                console.log(response.data)
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])
    const ModifyingaUserName = () => {
        const newusername = prompt('你的新名字:');
        if (newusername !== null) {
            axios({
                url: 'http://127.0.0.1:4000/modifyingausername',
                method: 'post',
                data: {
                    data: {
                        newusername: newusername,
                        id: localStorageData.userid
                    }
                },
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(() => {
                const oldData = JSON.parse(localStorage.getItem('loginData'));
                oldData.username = newusername;
                const newData = JSON.stringify(oldData)
                localStorage.setItem('loginData', newData);
                window.location.href = '/'
            }).catch((error) => {
                alert('用户名已经存在哦')
                console.log(error)
            })
        }

    }
    const ModifyingiIphoneNumber = () => {
        const phoneNumber = prompt('你的新电话:');
        if (phoneNumber !== null) {
            axios({
                url: 'http://127.0.0.1:4000/modifyingiphoneNumber',
                method: 'post',
                data: {
                    data: {
                        phoneNumber: phoneNumber,
                        id: localStorageData.userid
                    }
                },
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then((res) => {/* 
                const oldData = JSON.parse(localStorage.getItem('loginData'));
                oldData.username = newusername;
                const newData = JSON.stringify(oldData)
                localStorage.setItem('loginData', newData); */
                console.log(res.data)
                // window.location.href = '/'
            }).catch((error) => {
                alert('唉')
                console.log(error)
            })
        }

    }
    return (
        <div className={style.SettingAccount}>
            <img src={responseData.headimg} className={style.headimg}></img>
            <p><strong>id</strong></p>
            <p>{responseData._id}</p>
            <p><strong>用户名</strong><button onClick={ModifyingaUserName}>修改</button></p>
            <p>{responseData.username}</p>
            <p><strong>电子邮件</strong></p>
            <p>{responseData.email}</p>
            <p><strong>电话号码</strong><button onClick={ModifyingiIphoneNumber}>修改</button></p>
            <p>{responseData.phoneNumber === undefined ? '无' : responseData.phoneNumber}</p>
            <p><strong>生日</strong></p>
            <p>{responseData.birthday === undefined ? '无' : responseData.birthday}</p>
        </div>
    )
}
