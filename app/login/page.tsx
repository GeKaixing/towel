"use client"
import Button from '@/components/Button'
import Cloudflare from '@/components/ui/cloudflare';
import { Input } from '@/components/ui/input';
import { isForbid } from '@/store/isForbid';
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from 'zod';
import GoogleAuthButton from './_component/GoogleButton';

interface LoginData {
    username: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

interface FetchResponse {
    // Define the expected response structure here
    // For example:
    success: boolean;
    message: string;
}
const loginSchema = z.object({
    username: z.string().min(4).max(16).trim(),
    password: z.string().min(4).max(16).trim(),
})

async function fetchData(data: LoginData): Promise<FetchResponse | undefined> {

    const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        }),
        credentials: "include",
    });
    if (res.ok) { return await res.json(); }
    return undefined;
}

export default function Page() {
    const { isForbid: cloudflare } = isForbid()
    const [isError, setIsError] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };
            const resdata = loginSchema.safeParse(data).success
            if (!resdata) { setIsError(i => !i); return; }
            if (!data.password || !data.username) { setIsError(i => !i); return; }
            const response = await fetchData(data);
            if (response) {
                localStorage.setItem('userinfo', JSON.stringify(response));
                (event.target as HTMLFormElement).reset();
                window.location.href = '/';
            } else {
                setIsError(true)
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center gap-2'>
            <div className='w-[400px] flex flex-col justify-center items-center gap-2'>
                <div className='self-start'>username</div>
                <Input name="username" type="text"></Input>
                {/* <input name="username" type="text" className='dark:text-black w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl' placeholder="  username"></input> */}
                <div className='self-start'>password</div>
                <Input name="password" type="password"></Input>
                {/* <input name="password" type="password" className='dark:text-black w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl' placeholder="  password"></input> */}
                <Button type="submit" disabled={cloudflare !== 'solved'}>login</Button>
                <Link href="/signup">signup</Link>
                <GoogleAuthButton buttonText="continue with google"
                    className="!rounded-[18px] border-[#D9D9D9]"></GoogleAuthButton>
                {/* <Link href="/reset" className='text-gray-400'>reset</Link> */}
                {isError && <div className='text-red-500'>账号或者密码错误</div>}
                <Cloudflare></Cloudflare>
            </div>
        </form>
    )
}
