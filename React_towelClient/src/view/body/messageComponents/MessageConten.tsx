import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { useNoReadNumbers } from '../../../store/noReadNumbers.tsx';
import { useMessageResponseData } from '../../../store/MessageResponseData.tsx'
import { deleteNotifications, getNotifications, postReadnotifications } from '../../../services/message/Message.ts';
import { getOnePost } from '../../../services/post/post.ts';
import { privateChatContext } from '../../../store/privateChat.tsx';
import { useLanguage } from '../../../store/LanguageContext.tsx';

export default function Message() {
  const {t}=useLanguage();
  const { MessageResponseData, setMessageResponseData } = useMessageResponseData()//responseData,setResponseData
  const navigate = useNavigate()
  const { setNoReadNumber } = useNoReadNumbers()
  const { privateChatData } = useContext(privateChatContext)as {privateChatData:any}
  const [targetID, setTargetID] = useState('')
  const [reLoadnotifications, setReLoadNotifications] = useState(false)
  const MessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let localStorageDatas;
    if (localStorage.getItem('loginData')) {
      localStorageDatas = JSON.parse(localStorage.getItem('loginData')||'');
      getNotifications(localStorageDatas.userid).then((response) => {
        setMessageResponseData(response.data)
        const filterData = response.data.filter((item) => {
          return item.read === false
        })
        setNoReadNumber(() => filterData.length === 0 ? '' : filterData.length)
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [reLoadnotifications])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure the clicked target is not part of the message dropdown
      if (MessageRef.current && !MessageRef.current.contains(event.target)) {
        setTargetID(''); // Close the dropdown
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getOnePostApi = (POSEID:string, id:string, read:string) => {
    getOnePost(POSEID).then((response) => {
      if (response.data.length === 0) {
        return alert('文章已删除')
      }
      const data = JSON.stringify({ ...response.data, from: 'user' })
      navigate(`/postcontent/${POSEID}`, { state: data });
      if (!read) { readnotificationsApi(id) }
    })
      .catch((error) => { console.log(error) })
  }

  const readnotificationsApi = (id) => {
    postReadnotifications(id).then(() => {
    }).catch((error) => {
      console.log(error)
    })
  }

  const setTargetIDHandler = (id) => {
    if (targetID === id) {
      setTargetID('');
    } else {
      setTargetID(id);
    }
  }

  const deletReplyHandler = (Id:string) => {
    deleteNotifications(Id).then(() => {
      setReLoadNotifications(!reLoadnotifications)
    })
      .catch((error) => { console.log(error) })
  }

  return (
    <div className='space-y-2'>
      <div>{t('privateChat')}</div>
      {/* 与你private chata用户id */}
      {privateChatData.length !== 0 && (
        <Link to={`/privatechat/${privateChatData[0].sendid}`} state={{ userName: privateChatData[0].userName, headimg: privateChatData[0].headimg }}>
          <main className='space-x-2 flex flex-nowrap items-center'>
            <img className='h-10 w-10 rounded-full' src={privateChatData[0].headimg}></img>
            <span>{privateChatData[0].chatData}</span>
          </main>
        </Link>
      )}
      <div>@{t('my')}</div>
      {MessageResponseData.length !== 0 ? (
        MessageResponseData.map((item, index) => (
          <div className='w-full mt-2 flex items-center justify-between border-2 border-boxColor rounded-lg p-2 mb-2' key={index}>
            <div className='flex gap-2 items-center'>
              <img src={item.mentionedUserId[0]?.headimg} className='w-8 h-8 bg-[#55255F] rounded-full overflow-hidden' alt="headimg"></img>
              <div>{item.mentionedUserId[0]?.username}</div>
            </div>
            <div>{item.targetText}</div>
            <div onClick={() => setTargetIDHandler(item._id)} style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={MessageRef}>
              {!item.read && <div className='mr-2 font-bold text-[--assistantColor]'>未读</div>}
              <div className='cursor-pointer'>
                ...
              </div>
              {targetID === item._id && (
                <div className='box-border absolute right-0 w-50 bg-gray-200 flex flex-col items-center z-50 gap-2 rounded-lg pt-2 pb-2' onClick={e => e.stopPropagation()}>
                  <span className='rounded-lg font-bold border border-black w-37.5 h-12.5 flex items-center justify-center">' onClick={() => deletReplyHandler(item._id)}>{t('delete')}</span>
                  <span className='rounded-lg font-bold border border-black w-37.5 h-12.5 flex items-center justify-center">' onClick={() => getOnePostApi(item.postId, item._id, item.read)}>{t('intoPost')}</span>
                  <span className='rounded-lg font-bold border border-black w-37.5 h-12.5 flex items-center justify-center">'>{t('report')}</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className='p-2'>{t('noReply')}</div>
      )}
    </div>
  )
}
