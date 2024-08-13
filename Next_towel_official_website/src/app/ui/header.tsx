'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export default function Header() {
    const pathname = usePathname()
    return (
        <header className="p-2 lg:flex lg:justify-center">
            <nav className="flex justify-between items-center lg:w-1/2">
                <div className="flex items-center space-x-2">
                    <Link href='/'>
                        <img src='https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png' className="w-10 h-10 object-cover"></img>
                    </Link>
                    <Link href='/' className='text-sm'>主页
                        {
                            pathname === "/" && <hr />
                        }
                    </Link>
                    <Link href='/docs' className="text-sm">文档
                        {
                            pathname === "/docs" && <hr />
                        }</Link>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href='/lognin' className="text-gray-500">登录</Link>
                    <Link href='/signup' >注册</Link>
                </div>
            </nav>
        </header>
    )
}
