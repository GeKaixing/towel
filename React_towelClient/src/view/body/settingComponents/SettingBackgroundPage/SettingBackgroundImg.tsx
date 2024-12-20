import React, { useEffect, useState, useContext } from 'react'
// import style from './SettingBackgroundImg.module.css'
import { useSelectLightorDark } from '../../../../store/selectLightorDark'
import { getHPImageArchive } from '../../../../services/setting/setting'
import Backtab from '../../../../components/Backtab';
import { useLanguage } from '../../../../store/LanguageContext';
export default function SettingBackgroundImg() {
    const {t}=useLanguage();
    const [imgData, setImgDate] = useState<ArrayBuffer|string>('')
    const { colorModel, setColorModel } = useSelectLightorDark();
    const SettingBackgroundImgHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file.size < 5000000) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                if(event?.target && event.target.result !== null){
                const imageData = event.target.result;
                setImgDate(imageData);
                setColorModel(prevColorModel => !prevColorModel);
                localStorage.setItem('backgroundimg', imageData as string)
                localStorage.setItem('color-model', 'bing')
                localStorage.setItem('background-model', 'diy')
                }
            };
            fileReader.readAsDataURL(file);
        } else {
            alert('请使用小于5MB的图片')
        }
    }
    const SettingBackgroundBingImgHandler = () => {
        getHPImageArchive().then((response) => {
            setImgDate('https://cn.bing.com' + response.data.images[0].url)
            localStorage.setItem('backgroundimg', 'https://cn.bing.com' + response.data.images[0].url)
            localStorage.setItem('color-model', 'bing')
            localStorage.setItem('background-model', 'bing')
            setColorModel(!colorModel)
            location.reload()
        })
            .catch((error) => { console.log(error) })
    }
    useEffect(() => {
        const bgi = document.getElementById('bgi')
        if(!bgi)return;
        bgi.style.backgroundImage = `url(${localStorage.getItem('backgroundimg')})`
        bgi.style.backgroundSize = 'cover';
        bgi.style.backgroundPosition = 'center';
        bgi.style.position = 'fixed'; // 固定背景图片
        bgi.style.zIndex = '-1';
        bgi.style.top = '0';
        bgi.style.left = '0';
        bgi.style.height = '100vh';
        bgi.style.width = '100%';
        bgi.style.margin = '0';
    }, [imgData, colorModel])
    return (
        <>
        <Backtab text={t('setting')} href='/setting'></Backtab>
        <div className='flex flex-col justify-center items-center space-y-2'>
            <div className='absolute top-1/2 '>
                <div onClick={SettingBackgroundBingImgHandler} className=' flex  items-center text-[--fontColor] font-bold cursor-pointer'>{t('Use_bing_Daily_wallpapers')}
                    {localStorage.getItem('color-model') === 'bing' ? localStorage.getItem('background-model') === 'bing' ? <div className='w-2 h-2 rounded-full bg-[--hostColor]'></div> : null : null}
                </div>
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col  items-center '>
                    <label htmlFor='upload' className='w-12 h-12 bg-[--boxColor] flex justify-center items-center my-rounded-10px text-[--fontColor] '>{t('uploading')}</label>
                    <input className='hidden' id='upload' type='file' onChange={SettingBackgroundImgHandler} accept="image/*"></input>
                    {localStorage.getItem('color-model') === 'bing' ? localStorage.getItem('background-model') === 'diy' ? <div className='w-2 h-2 rounded-full bg-[--hostColor]'></div> : null : null}
                </form>
            </div>
        </div>
        </>
    )
}
