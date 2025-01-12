import React, { useState } from 'react'
import Portal from './Portal'
import PropTypes from 'prop-types'
import Dot from './Dot'
// @ts-ignore
import check from "../assets/static/otherIcon/check.svg"
// import Stripe from '../stripe/Stripe'

import useLocalStorage from '../hooks/useLocaStorage'
import { useConnectWallet } from '../store/ConnectWallet'
import { parseEther } from 'ethers'
import { postPremium } from '../services/setting/setting'
export default function Premium({ setShowPremium }) {
    const { signers, contracts } = useConnectWallet()
    const [isDot, setDot] = useState('Premium')
    const [localStorageData, setLocalStorage] = useLocalStorage();
    const checkhandler = (event: any) => {
        setDot(event.currentTarget.dataset.name);
    }

    const buyHandler = async () => {
        try {
            if (!contracts) return;
            if (!signers) return;
            if (!localStorageData.userid) return
            const isVip = await contracts.checkVIP(signers?.address);
            if (isVip) { console.log('已经是vip'); return; }
            const tx = await contracts.purchaseVIP({ value: parseEther("1") })
            await tx.wait().then(() => {
                console.log('支付成功')
                postPremium({
                    data: {
                        id: localStorageData.userid,
                        signerAddress: signers?.address
                    }
                }).then((data) => {
                    console.log('Premium data posted successfully', data);
                    setLocalStorage({ ...localStorageData, premium: true })
                    window.location.reload();
                }).catch(e => console.log(e))
            })
        } catch (e) {
            console.log(e)
        }
    }
    const cancelHandler = async () => {
        try {
            if (!contracts) return;
            if (!signers) return;
            if (!localStorageData.userid) return
            const isVip = await contracts.checkVIP(signers?.address);
            if (isVip) { console.log('目前是vip'); }
            const cancelVIP = await contracts.cancelVIP(signers?.address);
            if (cancelVIP) { console.log('已经不是vip'); }
            cancelVIP.wait().then(() => {
                postPremium({
                    data: {
                        id: localStorageData.userid,
                        signerAddress: signers?.address
                    }
                }).then((data) => {
                    console.log('Premium data posted successfully', data);
                    setLocalStorage({ ...localStorageData, premium: false })
                    window.location.reload();
                }).catch(e => console.log(e))
            })

        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Portal className='max-lg:hidden'>
            <div className='flex flex-col space-y-4 justify-center items-center bg-[--assistantColor]  rounded-my-rounded-10px p-2 '>
                <div className='cursor-pointer bg-[--hostColor] rounded-full w-10 h-10 flex justify-center items-center font-bold text-2xl self-end' onClick={() => setShowPremium(i => !i)} >X</div>
                <div className='flex space-x-10'>
                    {/* border-[--hostColor] border-solid border-2 rounded-my-rounded-10px */}
                    <section onClick={checkhandler} data-name='Premium' className='flex flex-col items-center w-full space-y-2'>
                        <div className='flex items-center space-x-2 relative'><p>Premium</p>{isDot === 'Premium' && <Dot className={'absolute left-16'}></Dot>}</div>
                        <div>按月计费 <span className='font-bold text-2xl'>15</span>/月</div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        <div className='flex space-x-2 self-start'> <img src={check} className='w-4 h-4'></img>  <div>it fugiat et cillum est ut aliqua</div></div>
                        {localStorageData.premium ?
                            <button className='border-[--hostColor] bg-[--hostColor] border-solid border-4 rounded-my-rounded-10px text-2xl' onClick={cancelHandler} >主动取消Premium</button> :
                            <button className='border-[--hostColor] bg-[--hostColor] border-solid border-4 rounded-my-rounded-10px text-2xl' onClick={buyHandler} >购买</button>}
                    </section>
                    {/* <section onClick={checkhandler} data-name='Premium+' className={`flex flex-col items-center w-full space-y-2`}>
                        <div className='flex items-center space-x-2 relative'><p>Premium+</p>{isDot === 'Premium+' && <Dot className='absolute left-[4.6rem]'></Dot>}</div>
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
                        <div className='border-[--hostColor] border-solid border-4 rounded-my-rounded-10px text-2xl' onClick={buyHandler}>购买</div>
                    </section> */}
                </div>
                <p className='w-96 h-22 text-xs'>订阅即表示你同意我们的 购买者服务条款。如条款中所述，除非提前取消，否则订阅服务将自动续订。随时取消. 请在续订前至少 24 小时取消订阅，以免产生额外费用。订阅需提供一个经认证的手机号码。如果你在其他平台上进行了订阅，请通过该平台来管理相关订阅服务。</p>
            </div>
            {/* {clientSecret && show && <Stripe clientSecret={clientSecret}></Stripe>} */}
            ···       </Portal>
    )
}
Premium.propTypes = {
    setShowPremium: PropTypes.func,
}