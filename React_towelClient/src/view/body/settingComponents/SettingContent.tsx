import React from 'react'
import SettingMenu from './SettingMenu'
import { Outlet } from 'react-router'

export default function SettingContent() {
  return (
      <div className=" w-full flex p-2  ">
        <div className='flex '>
          <SettingMenu />
        </div>
        <div className='fle-1 flex justify-center items-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
          <Outlet></Outlet>
        </div>
      </div>  
  )
}
