import React from 'react'
import SettingBackground from './SettingBackground'
import SettingUser from './SettingUser'
import style from './SettingContent.module.css'
import { Outlet } from 'react-router'

export default function SettingContent() {
  // console.log(window.innerWidth)
  return (
      <div className=" w-full flex p-2  ">
        <div className=''>
          <SettingBackground />
          <SettingUser></SettingUser>
        </div>
        <div className='fle-1 flex justify-center items-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
          <Outlet></Outlet>
        </div>
      </div>  
/*  <div className={style.container}>
      <div className={style.left}>
      <SettingBackground />
          <SettingUser></SettingUser>
      </div>
      <div className={style.right}>
      <Outlet></Outlet>
      </div>
    </div>  */
  )
}
