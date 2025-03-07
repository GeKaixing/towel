'use client'
// import Button from '@/components/Button';
import TowelButton from '@/components/ui/towel-button';
import { useRouter } from 'next/navigation';
export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        // 调用退出登录的 API
        await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        });
        // 重定向到首页
        router.push('/');
    };
    return <TowelButton onClick={handleLogout}>退出登录</TowelButton>
};