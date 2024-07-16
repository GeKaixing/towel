import React, { useEffect, useState } from 'react'
import style from './SettingAccount.module.css'
import { DatePicker, Space } from 'antd';
import { getUserinfo, postModifyingausername, postModifyingbirthday, postModifyingiphoneNumber } from '../../../../services/setting/setting';
import useLocalStorage from '../../../../hooks/useLocaStorage';
import { postUpLoad } from '../../../../services/add/add';
export default function SettingAccount() {
    const [responseData, setResponseData] = useState({})
    const [localStorageData, setLocalStorageData] = useLocalStorage();
    const [isShowBirthday, setisSHowBirthday] = useState(false);
    const [Birthday, setBirthday] = useState('');


    useEffect(() => {
        if (localStorageData) {
            setLocalStorageData(localStorageData)
            console.log(localStorageData.userid)
            getUserinfo(localStorageData.userid).then(response => {
                setResponseData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [Birthday])
    const ModifyingaUserName = () => {
        const newusername = prompt('你的新名字:');
        if (newusername !== null) {
            postModifyingausername({
                data: {
                    newusername: newusername,
                    id: localStorageData.userid
                }
            }).then(() => {
                const oldData = JSON.parse(localStorage.getItem('loginData'));
                oldData.username = newusername;
                const newData = JSON.stringify(oldData)
                localStorage.setItem('loginData', newData);
                window.location.href = '/'
            }).catch(() => {
                alert('用户名已经存在哦')
            })
        }

    }
    const ModifyingiIphoneNumber = () => {
        const phoneNumber = prompt('你的新电话:');
        if (phoneNumber !== null) {
            postModifyingiphoneNumber({
                data: {
                    phoneNumber: phoneNumber,
                    id: localStorageData.userid
                }
            }).then(() => {
            }).catch(() => {
                alert('唉')
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
            postModifyingbirthday({
                data: {
                    birthday: Birthday,
                    id: localStorageData.userid
                }
            })
                .then(() => {
                    setisSHowBirthday(() => !isShowBirthday)
                }).catch(() => {
                    alert('唉')
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
            const data = await postUpLoad(localStorageData.userid, { formData })
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
        <div className='flex flex-col justify-center items-center text-[--fontColor]' style={{ position: "relative" }}>
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
