import React from 'react'
import { Link } from 'react-router-dom'
import style from './About.module.css'
export default function About() {
  return (
    <div className={style.about}>
      <span> 
         <span>in development</span>
        <Link to="/">回到主页</Link>
      </span>

    </div>
  )
}
