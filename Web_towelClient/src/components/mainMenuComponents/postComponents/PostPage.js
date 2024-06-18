import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from './Post'
export default function Hompage({ userarticles,reloadUserArticle,setreloadUserArticle }) {
  const { pathname } = useLocation()
  const [articles, setarticles] = useState([])
  const [reload, setLoad] = useState(false)
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/post')
      .then((response) => {
        setarticles(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [reload])
  return (
    <div >
      {/* pathname根据是否再/ route判断形式什么组件，当不在"/"显示用户发布的POST */}
      {
        pathname === '/' ?
          articles.map(function (item, index) {
            return (
              <Post
                key={item._id}
                id={item._id}
                name={item.user.username}
                headimg={item.user.headimg}
                content={item.postText}
                comments={item.postComment}
                likes={item.postLike}
                favorites={item.favorites}
                postImages={item.postImages}
                postUserId={item.postUserId}
                reload={{ reload, setLoad }}
              >
              </Post>
            );
          }
          ) :
          userarticles.map(function (item, index) {
            return (
              <Post
                key={item._id}
                id={item._id}
                name={item.user.username}
                headimg={item.user.headimg}
                content={item.postText}
                comments={item.postComment}
                likes={item.postLike}
                favorites={item.favorites}
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

