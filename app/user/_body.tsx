"use client";
import React, { useEffect, useState } from 'react';
import textImg from "@/assets/test.png";
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import testImg from "@/assets/test.png";
import { CommentIcon, LikeIcon, StarIcon } from '@/components/icon';
import { formattingDate } from '@/util/date';

type order = 0 | 1 | 2;

export default function Page({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<order>(0);
  const [userid, setUserid] = useState<string>("");
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [replyData, setReplyData] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userinfo = localStorage.getItem('userinfo');
            if (userinfo) {
                const userid = JSON.parse(userinfo).userid || '';
                setUserid(userid);
                fetchData(userid);
            }
        }
    }, []);

    async function fetchData(userid: string) {
        const res = await GETPOST(userid);
        setPostData(res);
    }
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-center items-center flex-col gap-2'>
                <Image className='self-center' src={textImg} width={20} height={20} alt="header image" />
                {children}
            </div>
            <div className='flex w-full justify-between'>
                <Button onClick={async () => { setOrder(0); fetchData(userid); }}>帖子</Button>
                <Button onClick={async () => { setOrder(1); const res = await GETCOMMENT(userid); setCommentData(res); }}>评论</Button>
                <Button onClick={async () => { setOrder(2); const res = await GETREPLY(userid); setReplyData(res); }}>回复</Button>
            </div>
            <main>
                {order === 0 && (
                    <div className='mt-2 flex gap-2 flex-col w-full'>
                        {postData.map((item: any) => (
                            <div key={item._id} className="w-full border-2 dark:hover:border-[#353535] dark:border-[#0a0a0a] border-gray-100 hover:border-gray-200 p-2 rounded-xl">
                                <Link href={`/post/${item._id}`}>
                                    <header className="flex items-center gap-2">
                                        <Image width={30} height={30} src={testImg} alt="react logo" />
                                        <div className="text-xl font-bold">{item.user.username}</div>
                                    </header>
                                    <main className='mt-2 mb-2'>
                                        <div className="font-bold ">{item.postText}</div>
                                    </main>
                                    <footer className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <LikeIcon></LikeIcon>
                                            <span className='text-gray-400 hover:text-gray-800'>{item.postLike}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CommentIcon></CommentIcon>
                                            <span className='text-gray-400 hover:text-gray-800'>{item.postComment}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StarIcon></StarIcon>
                                            <span className='text-gray-400 hover:text-gray-800'>{item.postFavorite}</span>
                                        </div>
                                    </footer>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {order === 1 && (
                    <div className='mt-2 flex gap-2 flex-col'>
                        {commentData.map((item: any) => (
                            <div key={item._id}>
                                <header className="flex items-center gap-2">
                                    <Image width={30} height={30} src={testImg} alt="react logo" />
                                    <div className="text-xl font-bold">{item.users[0].username || 'towel'}</div>
                                </header>
                                <main>
                                    <div className="text-xl">{item.commentText}</div>
                                </main>
                                <footer className="flex flex-col justify-between">
                                    <div className='flex justify-between'>
                                        <div className='text-gray-400'>{item.commentCreateDate}</div>
                                        <div className='flex gap-2'>
                                            <LikeIcon></LikeIcon>
                                            <div className='text-gray-400 hover:text-gray-800'>{item.commentLike}</div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <StarIcon></StarIcon>
                                            <div className='text-gray-400 hover:text-gray-800'>10</div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        ))}
                    </div>
                )}
                {order === 2 && (
                    <div>
                        {replyData?.map((reply: any) => (
                            <div className=' mt-2 mb-2' key={reply._id}>
                                <header className="flex items-center gap-2">
                                    <Image width={30} height={30} src={testImg} alt="react logo" />
                                    <div className="text-xl font-bold">{reply.replyUser.username}</div>@
                                    <div className="text-xl font-bold text-gray-400">{reply.replyToreplyUser.username}</div>
                                </header>
                                <div className="text-xl ml-[30px]">{reply.replyText}</div>
                                <div className='flex justify-between'>
                                    <div className='text-gray-400'>{
                                    formattingDate( reply.replyCreateDate)
                                   }</div>
                                    <div className='flex gap-2'>
                                        <LikeIcon></LikeIcon>
                                        <div className='text-gray-400 hover:text-gray-800'>{reply.replyLike}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

const GETPOST = async (id: string) => {
    const res = await fetch(`/api/profile/post/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    });
    return await res.json();
};

const GETCOMMENT = async (id: string) => {
    const res = await fetch(`/api/profile/comment/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    });
    return await res.json();
};

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