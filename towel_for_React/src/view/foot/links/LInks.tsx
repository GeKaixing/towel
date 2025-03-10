import React, { useState } from 'react'
import githubIcon from '../../../assets/static/otherIcon/github.svg'
import weixinminiappIcon from '../../../assets/static/otherIcon/weixin-mini-app.svg'
import wexinapp from '../../../assets/static/otherIcon/wexinapp.png'
import bilibili from '../../../assets/static/otherIcon/bilibili.svg'
export default function LInks() {
    const [isWeixinminiappIcon,setIsWeixinminiappIcon]=useState(false);
    return (
        <div className='flex  space-x-2  w-full rounded-my-rounded-10px p-2'>
            <a className='w-8 h-8 hidden md:block' href="https://github.com/GeKaixing/towel" target="_blank" rel="noopener noreferrer">
                <img className='w-8 h-8' src={githubIcon} alt="GitHub"></img>
            </a>
            <div className="w-8 h-8 hidden md:block relative" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsWeixinminiappIcon(!isWeixinminiappIcon)} onMouseLeave={() => setIsWeixinminiappIcon(!isWeixinminiappIcon)}>
                <img className='w-8 h-8' src={weixinminiappIcon} alt="GitHub"></img>
                {isWeixinminiappIcon &&
                    <div className='w-40 h-40 absolute flex flex-col items-center'>
                        <img className='w-40 h-40 object-cover' src={wexinapp} alt='微信小程序二维码'></img>
                        <p>微信扫码</p>
                    </div>
                }
            </div>
            <a className='w-8 h-8 hidden md:block' href="https://www.bilibili.com/video/BV1hMYdeDES3/?spm_id_from=333.999.0.0&vd_source=a8f09f82a41fd6a96572d0cd8e6d5e77" target="_blank" rel="noopener noreferrer">
                <img className='w-8 h-8' src={bilibili} alt="Bilibili"></img>
            </a>
        </div>
    )
}
