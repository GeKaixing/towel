import { ModeToggle } from '@/components/ui/theme-button'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const data = [
        {
            id: 1,
            title: '钱包',
            href: '/setting/wallet'
        },
      
        {
            id: 3,
            title: '修改密码',
            href: '/setting/changepassword'
        },
        {
            id: 4,
            title: '关于',
            href: '/setting/about'
        },
        {
            id: 5,
            title: '账号',
            href: '/setting/account'
        },
        {
            id: 6,
            title: '购买会员',
            href: '/setting/stripe'
        },
    ]
    return (
        <div className='flex flex-col gap-2'>
            {data.map((item) => <SettingLink key={item.id} href={item.href} title={item.title}></SettingLink>)}
            <ModeToggle></ModeToggle>
        </div>
    )
}
function SettingLink({ href, title }: { href: string, title: string }) {
    return (
        <Link href={href} className=' dark:hover:bg-[#353535] dark:bg-[#0a0a0a]  w-full flex flex-row justify-between items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-xl'>
            <div>{title}</div>
            <div>&gt;</div>
        </Link>
    )
}