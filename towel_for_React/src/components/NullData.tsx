import React from 'react'
import { Link } from 'react-router-dom'

export default function NullDat() {
  return (
    <div className='flex '>
        没有数据哦，可以去
        <Link to={'/post'} className='text-[--hostColor] line-clamp-3'>
        发布
        </Link>
        文章哦
    </div>
  )
}
