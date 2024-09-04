import React, { useEffect, useState } from 'react'
import Post from '../../../../components/Post'
import PropTypes from 'prop-types'
import { getUsePost } from '../../../../services/user/user'

export default function UserArticle({localStorageData }) {
  /*        用户发布的文章      */
  // 获取登录用户发布的文章 
  const [userarticles, setuserarticles] = useState([])
  const [reloadUserArticle,setreloadUserArticle]=useState(false)
  useEffect(() => {
    if (localStorageData.userid) {
      getUsePost(localStorageData.userid)
        .then((response) => {
          setuserarticles(response.data)
        })
        .catch((error) => { console.log(error) })
    }
  }, [localStorageData,reloadUserArticle])
  return (
    <>
    { userarticles.map((item)=><Post
      key={item._id}
      id={item._id}
      name={item.user.username}
      headimg={item.user.headimg}
      content={item.postText}
      comments={item.postComment}
      likes={item.postLike}
      favorites={item.postFavorite}
      postImages={item.postImages}
      postVideos={item.postVideos}
      postUserId={item.postUserId}
      postTitle={item.postTitle}
      userarticles={userarticles} 
      reloadUserArticle={reloadUserArticle}
       setreloadUserArticle={setreloadUserArticle}></Post>)}
    </>
    
  )
}
UserArticle.propTypes = {
  localStorageData: PropTypes.shape({
    userid: PropTypes.string.isRequired, // userid 必须是字符串并且是必填项
    jwt: PropTypes.string.isRequired     // jwt 必须是字符串并且是必填项
  }).isRequired  // localStorageData 必须是对象并且是必填项
};