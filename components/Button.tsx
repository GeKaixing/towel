import React from 'react'
type type = "submit" | "reset" | "button" | undefined
export default function Button({ onClick, children, type,className }: { children: React.ReactNode, type?: type ,onClick?:(() => void) | undefined | (() => Promise<void>),className?:string}) {
  return (
    <button onClick={onClick} type={type} className={`dark:bg-[#0a0a0a] h-[32px] w-[64px] cursor-pointer bg-gray-100 flex justify-center items-center rounded-xl hover:bg-assistantColor ${className}`}>
      {children}
    </button>
  )
}
