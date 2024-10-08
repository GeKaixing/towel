import React, { useState } from 'react'
import Portal from './Portal'
import { PropTypes } from 'prop-types'
import Dot from './Dot'
import check from "../assets/static/otherIcon/check.svg"
import wexinapp from '../assets/static/otherIcon/wexinapp.png'
export default function Premium({ setShowPremium }) {
   const [isDot,setDot]=useState('Premium')
   const checkhandler=(event)=>{
    setDot(event.currentTarget.getAttribute('name'));
   }
    return (
        <Portal className='max-lg:hidden'>
            <div className='flex flex-col space-y-4 justify-center items-center bg-[--assistantColor]  rounded-my-rounded-10px p-2 '>
                <div className='cursor-pointer bg-[--hostColor] rounded-full w-10 h-10 flex justify-center items-center font-bold text-2xl self-end' onClick={() => setShowPremium(i => !i)} >X</div>
                <div className='flex space-x-10'>
                    {/* border-[--hostColor] border-solid border-2 rounded-my-rounded-10px */}
                    <section onClick={checkhandler} name='Premium' className='flex flex-col items-center w-full space-y-2'>
                        <div className='flex items-center space-x-2'><p>Premium</p>{isDot==='Premium'&&<Dot></Dot>}</div>
                        <div>按月计费 <span className='font-bold text-2xl'>15</span>/月</div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                    </section>
                    <section onClick={checkhandler} name='Premium+'  className={`flex flex-col items-center w-full space-y-2`}>
                        <div className='flex items-center space-x-2'><p>Premium+</p>{isDot==='Premium+'&&<Dot></Dot>}</div>
                        <div>按月计费 <span className='font-bold text-2xl'>20</span>/月</div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum  aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it cillum est ut aliqua</div></div>
                    </section>
                </div>
                <div className='border-[--hostColor] border-solid border-4 rounded-my-rounded-10px w-full flex flex-col space-y-2 items-center'>
                    <div className='font-bold text-xl'>扫码购买</div>
                    <img src={wexinapp} className='w-20 h-20'></img>
                    <p className='w-96 h-22 text-xs'>订阅即表示你同意我们的 购买者服务条款。如条款中所述，除非提前取消，否则订阅服务将自动续订。随时取消. 请在续订前至少 24 小时取消订阅，以免产生额外费用。订阅需提供一个经认证的手机号码。如果你在其他平台上进行了订阅，请通过该平台来管理相关订阅服务。</p>
                </div>
            </div>
        </Portal>
    )
}
Premium.propTypes = {
    setShowPremium: PropTypes.func,
}