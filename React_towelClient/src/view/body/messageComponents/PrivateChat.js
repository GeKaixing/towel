import React, { useContext, useEffect, useState } from 'react';
import addImgaIcon from '../../../assets/static/otherIcon/图片添加.svg';
import { getSocket } from '../../../socket/socket';
import { useLocation, useParams } from 'react-router';
import useLocalStorage from '../../../hooks/useLocaStorage';
import { privateChatContext } from '../../../store/privateChat';

export default function PrivateChat() {
    const [textLength, setTextLength] = useState('');
    const {privateChatData,setPrivateChatData}=useContext(privateChatContext)
    const params = useParams();
    const location = useLocation();
    const [localStorageData] = useLocalStorage();
    const socket = getSocket();
    useEffect(() => {
        return () => {
            socket.off('sendMsg');
        };
    }, [socket]);

    const sendPrivateChatHandler = () => {
        if (textLength) {
            // 发送私聊消息
            const sendData={
                userid: params.id,
                chatData: textLength,
                sendid: localStorageData.userid,
                headimg: localStorageData.headimg,
                userName: localStorageData.username
            }
            socket.emit('privatachat', {
              ...sendData
            });
            setPrivateChatData(prevChatData => [...prevChatData, sendData]);
            // 发送成功后清空文本框
            setTextLength('');
        }
    };

    return (
        <div className='w-full '>
            <header className='flex justify-center w-full mb-2 text-lg font-bold'>{location.state.userName}</header>
            <main className='space-y-12 mb-1/6 flex-1 overflow-auto px-2 pb-56 flex flex-col'>
                {privateChatData.map((item, index) => (
                    <div key={index} className={['flex', 'space-x-2', localStorageData.userid === item.sendid ? 'self-end' : 'self-start'].join(' ')}>
                        <img className={['w-10', 'h-10', 'rounded-full',localStorageData.userid === item.sendid ? 'order-1':''].join(' ')} src={item.headimg || location.state.headimg} alt="User avatar" />
                        <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'>
                            {item.chatData}
                        </span>
                    </div>
                ))}
            </main>
            <form className='fixed bottom-14 w-full px-2 min-[768px]:w-[calc(100%-14rem)] lg:w-[40%] lg:h-40 h-30 '
                onSubmit={(e) => { e.preventDefault(); sendPrivateChatHandler(); }}>
                <label htmlFor='send-file' className='absolute top-2 left-4'>
                    <img className='w-10 h-10' src={addImgaIcon} alt='添加图片' />
                </label>
                <input type='file' id='send-file' className='hidden' />
                <textarea value={textLength} onChange={(e) => setTextLength(e.target.value)}  maxLength="500" className='pt-10 resize-none w-full h-full border-[--fontColor] hover:border-[--fontColor] border-solid border-2 rounded-my-rounded-10px' />
                <span className='absolute bottom-3 right-4 space-x-2'>
                    <span>
                        {textLength.length}/500
                    </span>
                    <button type='submit' className='w-[4rem] h-8 rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor]'>发送</button>
                </span>
            </form>
        </div>
    );
}
