import React, { useEffect, useState } from 'react'
import Post from '../../../components/Post'
import propTypes from 'prop-types'
import { getPost } from '../../../services/post/post'
import postJson from '../../../assets/json/post.json'
export default function PostPage() {
  const [articles, setarticles] = useState([])
  const [reload, setLoad] = useState(false)
  useEffect(() => {
    /*global process */
    process.env.REACT_APP_TEST === 'TEST' ?
      setarticles(postJson) :
      getPost().then((response) => {
        setarticles(response.data)
      })
  }, [reload])
  return (
    <div className='p-2'>
      {articles.map(function (item) {
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
            postVideos={item.postVideos}
            postUserId={item.postUserId}
            reload={{ reload, setLoad }}
          >
          </Post>
        );
      }
      )}
    </div >
  )
}
PostPage.propTypes = {
  userarticles: propTypes.array,
}