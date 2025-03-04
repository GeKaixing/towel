'use client'
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import textImg from "@/assets/test.png";
import Image from 'next/image';
import Link from 'next/link';

type order = 0 | 1 | 2

export default function Page() {
    const [order, setOrder] = useState<order>(0)
    // const [userid, setUserid] = useState<string>('');
    const [PostData, setPostData] = useState([]);

    const handleClick = (value: order) => {
        setOrder(value)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userinfo = localStorage.getItem('userinfo');
            if (userinfo) {
                const userid = JSON.parse(userinfo).userid || '';
                // setUserid(userid);
                fetchData(userid);
            }
        }
    }, []);

    async function fetchData(userid: string) {
        const res = await GETREPLY(userid);
        setPostData(res);
    }

    return (
        <div>
            <header className='flex flex-row justify-between '>
                <Button onClick={() => handleClick(0)}>全部</Button>
                <Button onClick={() => handleClick(1)} > 私聊</Button>
                <Button onClick={() => handleClick(2)} > @我的</Button>
            </header >
            <main>
                {order === 0 &&
                    <div>
                        {
                            PostData.map((item: any) => (
                                <div key={item._id} className='mt-2 flex gap-2 flex-col'>
                                    <Link href={`/post/${item.postId}`} >
                                        <div className='flex gap-2'>
                                            <div style={{ position: 'relative', height: '20px', width: '20px' }}>
                                                <Image
                                                    fill
                                                    style={{
                                                        objectFit: 'cover', // cover, contain, none
                                                    }}
                                                    src={textImg}
                                                    alt="header image"
                                                />
                                            </div>
                                            <div className='text-xl font-bold'> {item.replyToreplyUser.username}</div>
                                            <main>
                                                {item.replyText}
                                            </main>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                }
                {order === 1 &&
                    <div className='mt-2 flex gap-2 flex-col'>
                        <div className='flex gap-2'>
                            <div style={{ position: 'relative', height: '20px', width: '20px' }}>
                                <Image
                                    fill
                                    style={{
                                        objectFit: 'cover', // cover, contain, none
                                    }}
                                    src={textImg}
                                    alt="header image"
                                />
                            </div>
                            <div className='text-xl font-bold'>test</div>
                            <main>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo veniam excepturi aliquam eos nesciunt quam cumque velit vel blanditiis, tempora natus magnam delectus maiores recusandae nihil, repellendus qui fuga est.
                            </main>
                        </div>
                    </div>
                }
                {order === 2 &&  <div>
                        {
                            PostData.map((item: any) => (
                                <div key={item._id} className='mt-2 flex gap-2 flex-col'>
                                    <Link href={`/post/${item.postId}`} >
                                        <div className='flex gap-2'>
                                            <div style={{ position: 'relative', height: '20px', width: '20px' }}>
                                                <Image
                                                    fill
                                                    style={{
                                                        objectFit: 'cover', // cover, contain, none
                                                    }}
                                                    src={textImg}
                                                    alt="header image"
                                                />
                                            </div>
                                            <div className='text-xl font-bold'> {item.replyToreplyUser.username}</div>
                                            <main>
                                                {item.replyText}
                                            </main>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>}
            </main>
        </div>
    )
}

const GETREPLY = async (id: string) => {
    const res = await fetch(`/api/profile/reply/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    });
    return await res.json();
};