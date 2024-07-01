import React, { useContext, useEffect, useState } from 'react'
import style from './SettingBackground.module.css'
import { selectLightorDarkContext } from '../../../App'
import { useNavigate } from "react-router-dom";

export default function SettingBackground() {
    //暗黑模式 
    const { colorModel, setColorModel } = useContext(selectLightorDarkContext)
    const [colorModeldata, setColorModeldata] = useState(null)
    const navigate = useNavigate()
    const autoColorHandler = () => {
        localStorage.clear('backgroundimg')
        localStorage.setItem('color-model', 'system')
        setColorModel(!colorModel)
    }
    const selectLightHandler = () => {
        localStorage.clear('backgroundimg')
        localStorage.setItem('color-model', 'light')
        setColorModel(!colorModel)
    }
    const selectDarkHandler = () => {
        localStorage.clear('backgroundimg')
        localStorage.setItem('color-model', 'dark')
        setColorModel(!colorModel)
    }
    const backgroundimgHandler = () => {
        navigate('/setting/backgroundimg', { replace: true })
    }
    useEffect(() => {
        const colorModeldata = localStorage.getItem('color-model');
        setColorModeldata(colorModeldata)
    }, [colorModel])
    return (
        <div className={style.settingContent}>
            <div onClick={backgroundimgHandler}>背景{colorModeldata === 'bing' ? <div className={style.dot}></div> : null}</div>
            <div onClick={autoColorHandler}>跟随系统{colorModeldata === 'system' ? <div className={style.dot}></div> : null}</div>
            <div onClick={selectLightHandler}>白天{colorModeldata === 'light' ? <div className={style.dot}></div> : null}</div>
            <div onClick={selectDarkHandler}>晚上{colorModeldata === 'dark' ? <div className={style.dot}></div> : null}</div>
        </div>
    )
}
