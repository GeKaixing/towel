"use client";
import Button from '@/components/Button';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { z } from 'zod';

const schema = z.object({
    username: z.string().min(1, { message: "username is required" }).max(6, { message: "username is too long" }),
    password: z.string().min(6, { message: "password is required" }).max(20, { message: "password is too long" }),
    email: z.string().min(1, { message: "email is required" }).email(),
    code: z.string().min(5, { message: "code is required" }).max(5, { message: "code is too long" }),
});

export default function Page() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        email: '',
        code: '',
    });
    // const emailNode=useRef(null);
    const [isError, setIsError] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            schema.parse(formData); // 验证表单数据
            const response = await fetchData(formData); // 等待请求完成
            if (response) {
                (event.target as HTMLFormElement).reset();
            }
            console.log('Response:', response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('Validation errors:', error.errors);
            }
        }
    };

    const verificationCodeHandle = async () => {
        const status = z.string().email().safeParse(formData.email);
        if (!status.success) return;
        const res = await fetchCodeData(formData);
        alert(res.message);
    };

    useEffect(() => {
        const email = formData.email;
        try {
            const status = z.string().email().safeParse(email);
            if (formData.email !== '') {
                if (!status.success) {
                    setIsError(true);
                } else {
                    setIsError(false);
                }
            } else {
                setIsError(false);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('Invalid email:', error.errors);
            }
        }
    }, [formData.email]);

    return (
        <form
            className='w-full flex flex-col justify-center items-center gap-2'
            onSubmit={handleSubmit}
        >
            <div className='w-[400px] flex flex-col justify-center items-center gap-2'>
                <div className='self-start'>username</div>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className='w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl'
                    placeholder="  username"
                />
                <div className='self-start'>password</div>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl'
                    placeholder="  password"
                />
                <div className='self-start flex flex-row gap-2'>
                    <div> email </div>
                    <div className='text-bold text-red-500'>{isError && '邮箱不符合格式'}</div>
                </div>
                <div className='flex self-start gap-2'>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='bg-gray-100 hover:bg-gray-200 rounded-xl'
                        placeholder="  email"
                    />
                    <div
                        onClick={verificationCodeHandle}
                        className='h-[32px] cursor-pointer bg-gray-100 flex justify-center items-center rounded-xl hover:bg-assistantColor w-auto p-2'
                    >
                        发送验证码
                    </div>
                </div>
                <div className='self-start'>code</div>
                <input
                    type="password"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className='w-[400px] bg-gray-100 hover:bg-gray-200 rounded-xl'
                    placeholder="  code"
                />
                <Button type="submit">signup</Button>
                <Link href="/login">login</Link>
            </div>
        </form>
    );
}

interface LoginData {
    username: string;
    password: string;
    email: string;
}

interface FetchResponse {
    success: boolean;
    message: string;
}

async function fetchData(data: LoginData): Promise<FetchResponse> {
    const res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            email: data.email,
        }),
    });
    return await res.json();
}

async function fetchCodeData(data: LoginData): Promise<FetchResponse> {
    const res = await fetch(`/api/nodemailerRegister`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
        }),
    });
    return await res.json();
}