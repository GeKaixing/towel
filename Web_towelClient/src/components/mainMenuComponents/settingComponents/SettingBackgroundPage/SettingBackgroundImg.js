import React, { useEffect, useState,useContext } from 'react'
import style from './SettingBackgroundImg.module.css'
import axios from 'axios'
import { selectLightorDarkContext } from '../../../../App'
export default function SettingBackgroundImg() {
    const [imgData, setImgDate] = useState('')
    const { colorModel ,setColorModel} = useContext(selectLightorDarkContext)
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
        document.getElementById('bgi').style.backgroundImage = `url(${localStorage.getItem('backgroundimg')})`
        document.getElementById('bgi').style.backgroundSize = 'cover';
        document.getElementById('bgi').style.backgroundPosition = 'center';
        document.getElementById('bgi').style.zIndex = '-1';
        document.getElementById('bgi').style.position = 'absolute';
        document.getElementById('bgi').style.top = '0';
        document.getElementById('bgi').style.left = '0';
        document.getElementById('bgi').style.height = '100vh';
        document.getElementById('bgi').style.width = '100%';
        document.getElementById('bgi').style.margin = '0';
    }, [imgData,colorModel])
    return (
        <div className={style.SettingBackgroundImg}>
            <div onClick={SettingBackgroundBingImgHandler } className={style.SettingBackgroundImgBing}>使用bing每日壁纸</div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type='file' onChange={SettingBackgroundImgHandler}></input>
            </form>
        </div>
    )
}
