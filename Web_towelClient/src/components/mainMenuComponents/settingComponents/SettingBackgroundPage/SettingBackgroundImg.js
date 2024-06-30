import React, { useState } from 'react'
import style from './SettingBackgroundImg.module.css'
import axios from 'axios'
export default function SettingBackgroundImg() {
    const [imgData, setImgDage] = useState('')
    const SettingBackgroundImgHandler = (e) => {
        setImgDage(e.target.file[0])
        console.log(imgData)
    }
    const SettingBackgroundBingImgHandler = () => {
        axios({ url: 'http://127.0.0.1:4000/HPImageArchive' })
            .then((response) => { setImgDage('https://cn.bing.com' + response.data.images[0].url) })
            .catch((error) => { console.log(error) })
    }
    return (
        <div className={style.SettingBackgroundImg}>
            <div className={style.img}
                style={{
                    backgroundImage: `url(${imgData})`,
                     backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      zIndex: -1, // 设置一个较低的z-index值
                      position: 'absolute', // 可能需要调整元素的定位方式
                      top: 0,
                      left: 0,
                      width: '100%',
                      margin: 0 
                }}
             ></div>
            <div onClick={SettingBackgroundBingImgHandler}>使用bing每日壁纸</div>
            <form onSubmit={(e) => e.defaultPrevented()}>
                <input type='file' onChange={SettingBackgroundImgHandler}></input>
            </form>
        </div>
    )
}
