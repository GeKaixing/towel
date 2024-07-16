import React from 'react'
import { Link } from 'react-router-dom'
export default function About() {
  return (
    <div className='flex  px-2 py-2 text-[--fontColor]'>
      <span> 
         <span>in development</span>
        <Link to="/">回到主页</Link>
      </span>

    </div>
  )
}
