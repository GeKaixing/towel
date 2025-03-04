'use client'
import Button from '@/components/Button'
import React, { useState } from 'react'
import Image from "next/image";
import testImg from "@/assets/test.png";

export default function Page({ }) {
    const [inputData, setInputData] = useState<string>('')
    const [data, setData] = useState<any[]>([])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (!inputData) return;
            setData((prevData) => [...prevData, { status: 'user', message: inputData }])
            const response = await fetchData(inputData);
            setData((prevData) => [...prevData, { status: 'ai', message: response.message }]);            setInputData('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='flex flex-col w-full h-screen justify-between'>
            {/* 消息列表 */}
            <div className='flex flex-col gap-4 p-4 overflow-y-auto flex-grow'>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.status === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex items-center gap-2 max-w-[70%] ${item.status === 'user' ? 'flex-row-reverse' : ''}`}>
                            <Image
                                width={30}
                                height={30}
                                src={testImg}
                                alt="avatar"
                                className="rounded-full"
                            />
                            <div className={`p-3 rounded-lg ${item.status === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                {item.message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 输入框 */}
            <form className='sticky bottom-0 p-4 bg-white dark:bg-black flex gap-2' onSubmit={handleSubmit}>
                <input
                    name='message'
                    type='text'
                    className='dark:text-black rounded-xl w-[350px] h-8 bg-gray-100 hover:bg-gray-200 px-2'
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
                <Button type='submit'>发送</Button>
            </form>
        </div>
    )
}

async function fetchData(data: string) {
    const res = await fetch(`/api/ai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: data
        }),
        
    });
    return await res.json();
}