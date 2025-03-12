
"use client"; // 标记为客户端组件
import { isShowPortal } from '@/store/isShowPortal';

export default function AIButton() {
    const setIsShow = isShowPortal((state) => state.setIsShow);

    return (
        <div onClick={() => setIsShow()} className='cursor-pointer'>
            <div>
                发布
            </div>
        </div>
    );
}