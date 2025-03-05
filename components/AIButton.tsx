
"use client"; // 标记为客户端组件
import { isShowPortal } from '@/store/isShowPortal';
import Link from 'next/link';

export default function AIButton() {
    const setIsShow = isShowPortal((state) => state.setIsShow);

    return (
        <div onClick={() => setIsShow()} className='cursor-pointer'>
            <Link href='/add'>
                发布
            </Link>
        </div>
    );
}