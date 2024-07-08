import React from 'react'
import Hompage from './postComponents/PostPage'
import style from './Post.module.css'


export default function Home() {
  return (
    <div className={style.home}>
      <Hompage></Hompage>
    </div>

  )
}
