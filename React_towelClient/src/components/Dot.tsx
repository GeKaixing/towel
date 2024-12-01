import React from 'react'

export default function Dot({className=''}) {
  return (
    <div className={`${className} w-2 h-2 rounded-full bg-[--hostColor]`}></div>
  )
}
