import React, { useEffect, useState } from 'react'
import addImgaIcon from '../../../assets/static/otherIcon/图片添加.svg'
import { getSocket } from '../../../socket/socket'
import { useLocation, useParams } from 'react-router'
import useLocalStorage from '../../../hooks/useLocaStorage'
export default function PrivateChat() {
    const [textLength, setTextLength] = useState('')
    const [chatData, setChatData] = useState([])
    const params = useParams()
    const location = useLocation();
    const [localStorageData] = useLocalStorage()
    const socket = getSocket()
    useEffect(() => {
        socket.emit('privatachat', { userid: params.id })
        const handleIncomingMessage = (data) => {
            setChatData(prevChatData => prevChatData.concat({ chatData: data.chatData, userid: data.userid }));
        }
        socket.on(`privatachat${params.id}`, handleIncomingMessage)
        return () => {
            socket.off(`privatachat${params.id}`, handleIncomingMessage);
        };
    }, [params.id, socket])
    const sendPrivateChatHandler = () => {
        if (textLength) socket.emit(`privatachat${params.id}`, { chatData: textLength, userid: localStorageData.userid })
    }
    return (
        <div className='w-full '>
            <header className='flex justify-center w-full mb-2 text-lg font-bold'>{location.state.userName}</header>{/* header */}
            <main className='space-y-12 mb-1/6  flex-1 overflow-auto px-2 pb-56 flex flex-col'>
                {/* 别人发送的不会等于自己的id */}
                {
                    chatData.map((items, index) => <div key={index} className={['flex', 'space-x-2', localStorageData.userid === items.userid ? 'self-end' : 'self-start'].join(' ')}>
                        <img className={['w-10', 'h-10', 'rounded-full', localStorageData.userid === items.userid ? 'order-2' : 'order-1'].join(' ')} src={location.state.headimg}></img>
                        <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'>
                            {items.chatData}
                        </span>
                    </div>
                    )
                }
            </main>
            <form className='fixed  bottom-14 w-full px-2 
            min-[768px]:w-[calc(100%-14rem)] 
            lg:w-[40%] lg:h-40 h-30 '
                onSubmit={(e) => { e.preventDefault(); sendPrivateChatHandler() }}>
                <label htmlFor='send-file' className='absolute top-2 left-4'>
                    <img className='w-10 h-10' src={addImgaIcon} alt='添加图片'></img>
                </label>
                <input type='file' id='send-file' className='hidden'></input>
                <textarea value={textLength} onChange={(e) => setTextLength(e.target.value)} resize='none' maxLength="500" className='pt-10 resize-none w-full h-full border-[--fontColor] hover:border-[--fontColor] border-solid border-2 rounded-my-rounded-10px'></textarea>
                <span className='absolute bottom-3 right-4 space-x-2'>
                    <span>
                        {textLength.length}/500
                    </span>
                    <button type='submit' className='w-[4rem] h-8 rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor]'>发送</button>
                </span>
            </form>

        </div>
    )
}
