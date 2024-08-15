import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Message.module.css'
import { useNavigate } from 'react-router';
import { Link} from 'react-router-dom'
import { noReadNumbers } from '../../../store/noReadNumbers';
import { MessageResponseDataContext } from '../../../store/MessageResponseData'
import { deleteNotifications, getNotifications, postReadnotifications } from '../../../services/message/Message';
import { getOnePost } from '../../../services/post/post';
import { privateChatContext } from '../../../store/privateChat';
export default function Message() {
  const { MessageResponseData: responseData, setMessageResponseData: setResponseData } = useContext(MessageResponseDataContext)//responseData,setResponseData
  const navigate = useNavigate()
  const { setNoReadNumber } = useContext(noReadNumbers)
  const {privateChatData}=useContext(privateChatContext)
  const [targetID, setTargetID] = useState('')
  const [reLoadnotifications, setReLoadNotifications] = useState(false)
  const MessageRef = useRef(null)
  useEffect(() => {
    let localStorageDatas;
    if (localStorage.getItem('loginData')) {
      localStorageDatas = JSON.parse(localStorage.getItem('loginData'));
      getNotifications(localStorageDatas.userid).then((response) => {
        setResponseData(response.data)
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
      if (MessageRef.current) {
        if (!(event.target.className === MessageRef.current.className)) {
          setTargetID('')
        }
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const getOnePostApi = (POSEID, id, read) => {
    getOnePost(POSEID).then((response) => {
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
    if (targetID) {
      setTargetID('')
    } else {
      setTargetID(id)
    }
  }
  const deletReplyHandler = (Id) => {
    deleteNotifications(Id) .then(() => {
        setReLoadNotifications(!reLoadnotifications)
      })
      .catch((error) => { console.log(error) })
  }
  return (
    <div className='space-y-2'>
      <div>私信</div>
        {/* 与你private chata用户id */}
        {
          privateChatData.length!==0&&<Link to={`/privatechat/${privateChatData[0].sendid}`} state={{userName:privateChatData[0].userName, headimg:privateChatData[0].headimg}}>
          <main className='space-x-2 flex flex-nowrap items-center'><img className='h-10 w-10 rounded-full'src={privateChatData[0].headimg}></img>
          <span>{privateChatData[0].chatData}</span>
          </main>
        </Link>
        }
      <div>@我的</div>
      {responseData.length !== 0 ? responseData.map((item, index) => (
        <div className={style.message} key={index}>
          <div className={style.messageheadImgAndName}>
            <img src={item.mentionedUserId[0].headimg} className={style.messageHeadImg} alt="headimg"></img>
            <div>{item.mentionedUserId[0].username}</div>
          </div>
          <div>{item.targetText}</div>
          <div onClick={() => setTargetIDHandler(item._id)} style={{ position: 'relative',display:'flex', alignItems:'center' }} className='MessageRef' ref={MessageRef}>{item.read ? null :
          <div className='mr-2 font-bold text-[--assistantColor]'>未读</div>}...
            {targetID === item._id ?
              <div className={style.MessageDeleteBox} onClick={e => e.stopPropagation()}>
                <span className={style.MessageDeleteBoxButton} onClick={() => deletReplyHandler(item._id)}>删除</span>
                <span className={style.MessageDeleteBoxButton} onClick={() => getOnePostApi(item.postId, item._id, item.read)}>进入文章</span>
                <span className={style.MessageDeleteBoxButton}>举报</span>
              </div> : null}
          </div>
        </div>
      )) : <div className='p-2'>暂无回复</div>}
    </div>
  )
}
