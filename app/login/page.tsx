"use client"
import Button from '@/components/Button'
import Link from 'next/link'
import React, { useState } from 'react'

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


async function fetchData(data: LoginData): Promise<FetchResponse> {
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
    return await res.json();
}
export default function Page() {
    const [isError, setIsError] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };
            const response = await fetchData(data);
            if (response) {
                localStorage.setItem('userinfo', JSON.stringify(response));
                (event.target as HTMLFormElement).reset();
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
                <input name="username" type="text" className='w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl' placeholder="  username"></input>
                <div className='self-start'>password</div>
                <input name="password" type="password" className='w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl' placeholder="  password"></input>
                <Button type="submit">login</Button>
                <Link href="/signup">signup</Link>
                {/* <Link href="/reset" className='text-gray-400'>reset</Link> */}
                {isError && <div className='text-red-500'>账号或者密码错误</div>}
              
            </div>
        </form>
    )
}
