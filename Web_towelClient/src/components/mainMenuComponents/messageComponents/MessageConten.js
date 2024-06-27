import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Message.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { noReadNumbers } from '../../../context/noReadNumbers';
import { MessageResponseDataContext } from '../../../App'
export default function Message() {
  const { MessageResponseData: responseData, setMessageResponseData: setResponseData } = useContext(MessageResponseDataContext)//responseData,setResponseData
  const [localStorageData, setLocalStorageData] = useState({})
  const navigate = useNavigate()
  const { setNoReadNumber } = useContext(noReadNumbers)
  const [targetID, setTargetID] = useState('')
  const [reLoadnotifications, setReLoadNotifications] = useState(false)
  const MessageRef = useRef(null)
  useEffect(() => {
    let localStorageDatas;
    if (localStorage.getItem('loginData')) {
      setLocalStorageData(JSON.parse(localStorage.getItem('loginData')))
      localStorageDatas = JSON.parse(localStorage.getItem('loginData'));
      axios({
        url: `http://127.0.0.1:4000/notifications/${localStorageDatas.userid}`,
        headers: {
          'Authorization': `Bearer ${localStorageDatas.jwt}`
        },
      }).then((response) => {
        setResponseData(response.data)
        console.log(response.data)
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
    axios({
      url: `http://127.0.0.1:4000/findonepost/${POSEID}`,
      headers: { 'Authorization': `Bearer ${localStorageData.jwt}` }
    })
      .then((response) => {
        const data = JSON.stringify({ ...response.data, from: 'user' })
        navigate(`/homepage/${POSEID}`, { state: data });
        if (!read) { readnotificationsApi(id) }
      })
      .catch((error) => { console.log(error) })
  }
  const readnotificationsApi = (id) => {
    axios({
      url: `http://127.0.0.1:4000/readnotifications/${id}`,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${localStorageData.jwt}`
      }
    }).then(response => {
      console.log(response.data)
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
    axios({
      url: `http://127.0.0.1:4000/delnotifications/${Id}   `,
      method: "delete",
      headers: {
        'Authorization': `Bearer ${localStorageData.jwt}`
      }
    })
      .then(() => {
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
