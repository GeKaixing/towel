import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Message.module.css'
import { useNavigate } from 'react-router';
import { noReadNumbers } from '../../../store/noReadNumbers';
import { MessageResponseDataContext } from '../../../store/MessageResponseData'
import { deleteNotifications, getNotifications, postReadnotifications } from '../../../services/message/Message';
import { getOnePost } from '../../../services/post/post';
export default function Message() {
  const { MessageResponseData: responseData, setMessageResponseData: setResponseData } = useContext(MessageResponseDataContext)//responseData,setResponseData
  const navigate = useNavigate()
  const { setNoReadNumber } = useContext(noReadNumbers)
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
      navigate(`/homepage/${POSEID}`, { state: data });
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
    <div>
      {responseData.length !== 0 ? responseData.map((item, index) => (
        <div className={style.message} key={index}>
          <div className={style.messageheadImgAndName}>
            <img src={item.mentionedUserId[0].headimg} className={style.messageHeadImg} alt="headimg"></img>
            <div>{item.mentionedUserId[0].username}</div>
          </div>
          <div>{item.targetText}</div>
          <div onClick={() => setTargetIDHandler(item._id)} style={{ position: 'relative' }} className='MessageRef' ref={MessageRef}>{item.read ? null : "未读"}...
            {targetID === item._id ?
              <div className={style.MessageDeleteBox} onClick={e => e.stopPropagation()}>
                <span className={style.MessageDeleteBoxButton} onClick={() => deletReplyHandler(item._id)}>删除</span>
                <span className={style.MessageDeleteBoxButton} onClick={() => getOnePostApi(item.postId, item._id, item.read)}>进入文章</span>
                <span className={style.MessageDeleteBoxButton}>举报</span>
              </div> : null}
          </div>
        </div>
      )) : <div>暂无回复</div>}
    </div>
  )
}
