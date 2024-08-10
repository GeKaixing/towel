import React from 'react'
import { useLocation } from 'react-router'
import Post from './Post'

export default function Search() {
    const { state } = useLocation()
    return (
        <div className='w-full p-2'>
            {(state.length!==0) ?
                state.map((item) => <Post
                    key={item._id}
                    id={item._id}
                    name={item.user[0].username}
                    headimg={item.user[0].headimg}
                    content={item.postText}
                    comments={item.postComment}
                    likes={item.postLike}
                    favorites={item.favorites}
                    postImages={item.postImages}
                    postUserId={item.postUserId}
                />) : <div>没有数据</div>
            }
        </div>

    )
}
