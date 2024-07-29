import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from './Post'
import propTypes from 'prop-types'
import { getPost } from '../../../services/post/post'
import postJson from '../../../assets/json/post.json'
export default function PostPage({ userarticles = [], reloadUserArticle = false, setreloadUserArticle }) {
  const { pathname } = useLocation()
  const [articles, setarticles] = useState([])
  const [reload, setLoad] = useState(false)
  useEffect(() => {
    /*global process */
    process.env.REACT_APP_TEST === 'TEST' ?
      setarticles(postJson):
      getPost().then((response) => {
        setarticles(response.data)
      })
  }, [reload])
  return (
    <div className='p-2'>
      {/* pathname根据是否再/ route判断形式什么组件，当不在"/"显示用户发布的POST */}
      {
        pathname === '/' ?
          articles.map(function (item) {
            return (
              <Post
                key={item._id}
                id={item._id}
                name={item.user.username}
                headimg={item.user.headimg}
                content={item.postText}
                comments={item.postComment}
                likes={item.postLike}
                favorites={item.postFavorite}
                postImages={item.postImages}
                postUserId={item.postUserId}
                reload={{ reload, setLoad }}
              >
              </Post>
            );
          }
          ) :
          userarticles.map(function (item) {
            return (
              <Post
                key={item._id}
                id={item._id}
                name={item.user.username}
                headimg={item.user.headimg}
                content={item.postText}
                comments={item.postComment}
                likes={item.postLike}
                favorites={item.postFavorite}
                postImages={item.postImages}
                postUserId={item.postUserId}
                reload={{ reload, setLoad }}
                reloadUserArticle={reloadUserArticle}
                setreloadUserArticle={setreloadUserArticle}
              >
              </Post>
            );
          }
          )
      }
    </div >
  )
}
PostPage.propTypes = {
  userarticles: propTypes.array,
  reloadUserArticle: propTypes.bool,
  setreloadUserArticle: propTypes.func,
}