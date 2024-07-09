import React, { useEffect, useState } from 'react'
import PostComment from '../../postComponents/postContent/PostComment'
import PropTypes from 'prop-types'
import { getUseComment } from '../../../../services/user/user'

export default function Userlikes({ localStorageData }) {
  /*        用户点赞的文章      */
  // 获取登录用户发布的文章
  const [userCommentData, setUserCommentData] = useState([])
  const [reloadUserlikes, setreloadUserlikes] = useState(false)
  //获取loginReducer 切片的用户数据
  useEffect(() => {
    getUseComment(localStorageData.userid)
      .then((response) => {
        setUserCommentData(response.data)
      })
      .catch((error) => { console.log(error) })
  }, [localStorageData, reloadUserlikes])
  return (
    <PostComment userCommentData={userCommentData} reloadUserlikes={reloadUserlikes} setreloadUserlikes={setreloadUserlikes}></PostComment>
  )
}
Userlikes.propTypes = {
  localStorageData: PropTypes.shape({
    userid: PropTypes.string.isRequired, // userid 必须是字符串并且是必填项
    jwt: PropTypes.string.isRequired     // jwt 必须是字符串并且是必填项
  }).isRequired  // localStorageData 必须是对象并且是必填项
};