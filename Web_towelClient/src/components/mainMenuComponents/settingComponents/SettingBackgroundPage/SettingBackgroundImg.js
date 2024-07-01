import React, { useEffect, useState, useContext } from 'react'
import style from './SettingBackgroundImg.module.css'
import axios from 'axios'
import { selectLightorDarkContext } from '../../../../App'
export default function SettingBackgroundImg() {
    const [imgData, setImgDate] = useState('')
    const { colorModel, setColorModel } = useContext(selectLightorDarkContext)
    const SettingBackgroundImgHandler = (e) => {
        setImgDate(e.target.file[0])
        console.log(imgData)
    }
    const SettingBackgroundBingImgHandler = () => {
        axios({ url: 'http://127.0.0.1:4000/HPImageArchive' })
            .then((response) => {
                setImgDate('https://cn.bing.com' + response.data.images[0].url)
                localStorage.setItem('backgroundimg', 'https://cn.bing.com' + response.data.images[0].url)
                localStorage.setItem('color-model', 'bing')
                setColorModel(!colorModel)
            })
            .catch((error) => { console.log(error) })
    }
    useEffect(() => {
        const bgi = document.getElementById('bgi')
        bgi.style.backgroundImage = `url(${localStorage.getItem('backgroundimg')})`
        bgi.style.backgroundSize = 'cover';
        bgi.style.backgroundPosition = 'center';
        bgi.style.zIndex = '-1';
        bgi.style.position = 'absolute';
        bgi.style.top = '0';
        bgi.style.left = '0';
        bgi.style.height = '100vh';
        bgi.style.width = '100%';
        bgi.style.margin = '0';
    }, [imgData, colorModel])
    return (
        <div className={style.SettingBackgroundImg}>
            <div onClick={SettingBackgroundBingImgHandler} className={style.SettingBackgroundImgBing}>使用bing每日壁纸</div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type='file' onChange={SettingBackgroundImgHandler}></input>
            </form>
        </div>
    )
}
