import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../../postComponents/PostPage'
import PropTypes from 'prop-types'

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
UserArticle.propTypes = {
  localStorageData: PropTypes.shape({
    userid: PropTypes.string.isRequired, // userid 必须是字符串并且是必填项
    jwt: PropTypes.string.isRequired     // jwt 必须是字符串并且是必填项
  }).isRequired  // localStorageData 必须是对象并且是必填项
};