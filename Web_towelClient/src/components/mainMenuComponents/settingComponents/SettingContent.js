import React from 'react'
import SettingBackground from './SettingBackground'
import SettingUser from './SettingUser'
import style from './SettingContent.module.css'
import { Outlet } from 'react-router'

export default function SettingContent() {
  return (
    <div className={style.settingContent}>
      <div className={style.settingMenu}>
        <SettingBackground />
        <SettingUser></SettingUser>
      </div>
      <div className={style.settingleftContent}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
