import React, { useEffect, useState } from 'react'
import style from './SettingAccount.module.css'
import axios from 'axios';
import { DatePicker, Space } from 'antd';
export default function SettingAccount() {
    const [responseData, setResponseData] = useState({})
    const [localStorageData, setLocalStorageData] = useState({});
    const [isShowBirthday, setisSHowBirthday] = useState(false);
    const [Birthday, setBirthday] = useState('');


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
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [Birthday])
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
    const ModifyingiBirthday = () => {
        setisSHowBirthday(() => !isShowBirthday)
    }
    const onChangeHandler = (date, dateString) => {
        setBirthday(dateString)
    };
    const ModifyingiSendBirthday = () => {
        if (Birthday) {
            axios({
                url: 'http://127.0.0.1:4000/modifyingbirthday',
                method: 'post',
                data: {
                    data: {
                        birthday: Birthday,
                        id: localStorageData.userid
                    }
                },
                headers: {
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            }).then(() => {
                setisSHowBirthday(() => !isShowBirthday)
            }).catch((error) => {
                alert('唉')
                console.log(error)
            })
        }
    }
    const upImageApi = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function () { };
            reader.readAsDataURL(file);
            await ModifyingaUpLoadNewHeadImg(file);
        } catch (error) { console.log(error) }

    };
    const ModifyingaUpLoadNewHeadImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('targetId', localStorageData.userid);
            formData.append('staticType', 'add');
            const data = await axios({
                url: `http://127.0.0.1:4000/uploadHeadImg/${localStorageData.userid}`,
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorageData.jwt}`,
                }
            });
            if (data.data) {
                const oldData = JSON.parse(localStorage.getItem('loginData'));
                oldData.headimg = data.data;
                const newData = JSON.stringify(oldData)
                localStorage.setItem('loginData', newData);
                window.location.href = '/'
            } else {
                alert('上传失败')
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={style.SettingAccount} style={{ position: "relative" }}>
            <p style={{ display: 'flex', alignItems: "center" }}>
                <img src={responseData.headimg} className={style.headimg}></img>
                <label className={style.uploadNewHeadImg} htmlFor='uploadNewHeadImg' title='修改' >
                    修改
                </label>
                <input type='file' id='uploadNewHeadImg' onChange={upImageApi} style={{ display: "none" }}></input>
            </p>

            <p><strong>id</strong></p>
            <p>{responseData._id}</p>
            <p><strong>用户名</strong><button onClick={ModifyingaUserName}>修改</button></p>
            <p>{responseData.username}</p>
            <p><strong>电子邮件</strong></p>
            <p>{responseData.email}</p>
            <p><strong>电话号码</strong><button onClick={ModifyingiIphoneNumber}>修改</button></p>
            <p>{responseData.phoneNumber === undefined ? '无' : responseData.phoneNumber}</p>
            <p><strong>生日</strong><button onClick={ModifyingiBirthday}>修改</button></p>
            <p>{Birthday ? Birthday : responseData.birthday === undefined ? '无' : responseData.birthday}</p>
            {isShowBirthday ? <div style={{ position: 'absolute' }}>
                <Space direction="vertical" locale='zh-CN' placement="topLeft" >
                    <DatePicker onChange={onChangeHandler} locale={'zh-CN'} placement="topLeft" />
                </Space>
                <br />
                <button onClick={ModifyingiSendBirthday}>确认</button> </div> : null}
        </div>
    )
}
