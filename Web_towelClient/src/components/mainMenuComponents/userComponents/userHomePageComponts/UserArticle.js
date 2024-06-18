import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../../postComponents/PostPage'
export default function UserArticle({localStorageData }) {
  /*        用户发布的文章      */
  // 获取登录用户发布的文章 
  const [userarticles, setuserarticles] = useState([])
  const [reloadUserArticle,setreloadUserArticle]=useState(false)
  useEffect(() => {
    if (localStorageData.userid) {
      axios({
        url: `http://127.0.0.1:4000/getusepost/${localStorageData.userid}`,
        headers: { 'Authorization': `Bearer ${localStorageData.jwt}` }
      })
        .then((response) => {
          setuserarticles(response.data)
        })
        .catch((error) => { console.log(error) })
    }
  }, [localStorageData,reloadUserArticle])
  return (
    <Post userarticles={userarticles} reloadUserArticle={reloadUserArticle} setreloadUserArticle={setreloadUserArticle}></Post>
  )
}
