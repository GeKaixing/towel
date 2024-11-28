import React, { useEffect, useState } from 'react'
import { useSelectLightorDark } from '../../../store/selectLightorDark'
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from '../../../store/LanguageContext';

export default function SettingMenu() {
    const { t, switchLanguage, language } = useLanguage();
    const switchLanguageHandler = () => {
        language === 'zh' ? switchLanguage('en') : switchLanguage('zh');
    }

    //暗黑模式 
    const { colorModel, setColorModel } = useSelectLightorDark()
    const [colorModeldata, setColorModeldata] = useState<string | null>(null)
    const navigate = useNavigate()
    const autoColorHandler = () => {
        localStorage.setItem('backgroundimg', '')
        localStorage.setItem('color-model', 'system')
        setColorModel(!colorModel)

    }
    const selectLightHandler = () => {
        if (localStorage.getItem('color-model') === 'bing') { location.reload() }
        localStorage.setItem('backgroundimg', '')
        localStorage.setItem('color-model', 'light')
        setColorModel(!colorModel)
    }
    const selectDarkHandler = () => {
        if (localStorage.getItem('color-model') === 'bing') { location.reload() }
        localStorage.setItem('backgroundimg', '')
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
        <div className='flex flex-wrap gap-2 mt-2 text-center items-center text-[--fontColor]'>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={backgroundimgHandler}>{t('background')}{colorModeldata === 'bing' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={autoColorHandler}>{t('auto')}{colorModeldata === 'system' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectLightHandler}>{t('white')}{colorModeldata === 'light' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={selectDarkHandler}>{t('dark')}{colorModeldata === 'dark' ? <div className='w-2 h-2 rounded-full bg-[rgb(134,196,248,1)]'></div> : null}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/auth', { replace: true })}>towel {t('authority')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/account', { replace: true })}>{t('accountInformation')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/forget', { replace: true })}>{t('forgetPassword')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/deactivate', { replace: true })}>{t('cancelAccount')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/orderform', { replace: true })}>{t('orderForm')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/contactme', { replace: true })}>{t('contactMe')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/setting/contactme', { replace: true })}>{t('customerService')}</div>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={switchLanguageHandler}>{t('Language')}</div>
            <Link to={"https://blog.gekaixing.top/"} target={'_blank'}> <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' >{t('blog')}</div></Link>
            <div className='w-[80px] h-[60px] rounded-[10px] bg-[--boxColor]  flex flex-col justify-between items-center hover:bg-[--boxHoverColor]' onClick={() => navigate('/about', { replace: true })}>{t('about')}</div>
        </div>
    )
}
