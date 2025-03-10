import React, { useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import { getUserinfo, postModifyingausername, postModifyingbirthday, postModifyingiphoneNumber } from '../../../../services/setting/setting';
import useLocalStorage from '../../../../hooks/useLocaStorage';
import { postUpLoadheadimg } from '../../../../services/add/add';
import dayjs from 'dayjs';
import Backtab from '../../../../components/Backtab';
import {responseData} from '../../../../types/body/settingComponents/SettingUserPage/SettingAccount';
import { useLanguage } from '../../../../store/LanguageContext';
export default function SettingAccount() {
    const [responseData, setResponseData] = useState<responseData>({})
    const [localStorageData, setLocalStorageData] = useLocalStorage();
    const [isShowBirthday, setisSHowBirthday] = useState(false);
    const [Birthday, setBirthday] = useState('');
    const {t}=useLanguage();

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
                const oldData = JSON.parse(localStorage.getItem('loginData')as string);
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
            formData.append('headimg', file);
            formData.append('targetId', localStorageData.userid);
            formData.append('staticType', 'add');
            const data = await postUpLoadheadimg(localStorageData.userid,  formData )
            if (data.data) {
                const oldData = JSON.parse(localStorage.getItem('loginData')as string);
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
        <>
        <Backtab text={t('setting')} href='/setting'></Backtab>
        <div className='flex flex-col  items-start text-[--fontColor] absolute left-1/2 -translate-x-1/2 mt-2' >
            <p style={{ display: 'flex', alignItems: "center" }}>
                <img src={responseData.headimg} className='w-12 h-12 rounded-full overflow-hidden'></img>
                <label  htmlFor='uploadNewHeadImg' title={t('amend')} >
                    {t('amend')}
                </label>
                <input type='file' id='uploadNewHeadImg' onChange={upImageApi} style={{ display: "none" }}></input>
            </p>
            <p><strong>id</strong></p>
            <p>{responseData._id}</p>
            <p><strong>{t('name')}</strong><button onClick={ModifyingaUserName}>{t('amend')}</button></p>
            <p>{responseData.username}</p>
            <p><strong>{t('email')}</strong></p>
            <p>{responseData.email}</p>
            <p><strong>{t('phonenumber')}</strong><button onClick={ModifyingiIphoneNumber}>{t('amend')}</button></p>
            <p>{responseData.phoneNumber === undefined ? t('nothing') : responseData.phoneNumber}</p>
            <p><strong>{t('birthday')}</strong><button onClick={ModifyingiBirthday}>{t('amend')}</button></p>
            <p><strong>{t('date_created')}</strong>
            <div className='text-sm text-[--boxHoverColor] font-bold'>{ dayjs(responseData.CreateDate).format('YYYY-MM-DD HH:mm:ss') }</div></p>
            <p>{Birthday ? Birthday : responseData.birthday === undefined ? t('nothing') : responseData.birthday}</p>
            {isShowBirthday ? <div style={{ position: 'absolute' }}>
                <Space direction="vertical">
                    <DatePicker onChange={onChangeHandler}  placement="topLeft" />
                </Space>
                <br />
                <button onClick={ModifyingiSendBirthday}>{t('enter')}</button> </div> : null}
        </div>
        </>
    )
}
