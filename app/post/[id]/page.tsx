"use client";
import React, { use, useEffect, useState } from 'react';
import Image from "next/image";
import testImg from "@/assets/test.png";
import Button from '@/components/Button';
import { createPortal } from 'react-dom';
import { LikeIcon, ShareIcon, StarIcon } from '@/components/icon';
import { formattingDate } from '@/util/date';

type Comment = {
  commentUserId: string;
  Text: string;
  Image: string;
  Like: number;
  CreateDate: string;
};

export default function Page({ params }: { params: any }) {
  const { id }: { id: any } = use(params);
  const [resData, setResData] = useState<any>([]);
  const [inputData, setInputData] = useState<string>('');
  const [comments, setComment] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isShowPortalState, setIsShowPortalState] = useState<boolean>(false);
  const [inputReplyData, setInputReplyData] = useState<string>('');
  const [getCommentId, setGetCommentId] = useState<string>('');
  const [getCommentUserId, setGetCommentUserId] = useState<string>('');
  const [replyDataMap, setReplyDataMap] = useState<{ [key: string]: any[] }>({});
  const [showReplyMap, setShowReplyMap] = useState<{ [key: string]: boolean }>({});
  const [getReplyToreplyUserId, setGetReplyToreplyUserId] = useState<string>('');
  const [replyorComment, setReplyorComment] = useState<string>('comment');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await GET(id);
      setResData(res[0]);
    };
    fetchPosts();
  }, [id]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await GETCOMMENT(id);
        setComment(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, [id, refresh]);

  const addComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputData === '') { alert('请输入评论内容'); return };
    const UserId = JSON.parse(localStorage.getItem('userinfo') as string).userid;
    const data: Comment = { commentUserId: UserId, Text: inputData, Image: '', Like: 0, CreateDate: new Date().toString() };
    await POSTCOMMENT(id, data);
    (event.target as HTMLFormElement).reset();
    setRefresh(!refresh);
  };

  const addReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputReplyData === '') { alert('请输入@内容'); return };
    const UserId = JSON.parse(localStorage.getItem('userinfo') as string).userid;
    const data = {
      postId: id,
      commentId: getCommentId,
      replyUserId: UserId,
      replyToreplyUserId: replyorComment === 'comment' ? getCommentUserId : getReplyToreplyUserId,
      replyText: inputReplyData.replace(/^@\w+:/, '').trim(),
      replyImages: '',
      replyLike: 0,
      replyComment: 0,
      CreateDate: new Date().toString(),
    };
    await POSTREPLY(data);
    setInputReplyData('');
    setRefresh(!refresh);
  };

  const getReply = async (commentId: string) => {
    const res = await GETREPLY(commentId);
    setReplyDataMap((prev) => ({ ...prev, [commentId]: res }));
  };

  const toggleReply = (commentId: string) => {
    setShowReplyMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    if (!showReplyMap[commentId]) {
      getReply(commentId);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full border-2 dark:bg-[#0a0a0a] dark:border-[#0a0a0a] dark:hover:border-[#353535] border-gray-100 hover:border-gray-200 p-2 rounded-xl">
        <header className="flex items-center gap-2">
          <Image width={30} height={30} src={testImg} alt="react logo" />
          <div className="text-xl font-bold">{resData.user?.username || ' '}</div>
        </header>
        <main className='mt-2 mb-2'>
          <div className="font-bold text-black">{resData.postText}</div>
        </main>
        <footer className="flex justify-between">
          <div className="flex items-center gap-2">
            <LikeIcon></LikeIcon>
            <span>{resData.postLike}</span>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon></StarIcon>
            <span>{resData.postShare}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShareIcon></ShareIcon>
          </div>
        </footer>
      </div>
      <form onSubmit={addComment} className='mb-2 self-center flex flex-row gap-2 items-center mt-2'>
        <input onChange={(e) => { setInputData(e.target.value) }} name="comment" placeholder='  发表评论' className='dark:hover:bg-[#353535] dark:bg-[#0a0a0a] rounded-xl w-[350px] h-[40px] bg-gray-100 hover:bg-gray-200' />
        <Button type="submit">发表</Button>
      </form>
      {/* 评论区 */}
      {comments.map((item: any) => (
        <div key={item._id} className='mb-4'>
          <header className="flex items-center gap-2">
            <Image width={30} height={30} src={testImg} alt="react logo" />
            <div className="text-xl font-bold">{item.users[0].username || 'towel'}</div>
          </header>
          <main>
            <div className="text-xl ">{item.commentText}</div>
          </main>
          <footer className="flex flex-col justify-between">
            <div className='flex justify-between'>
              <div className='text-gray-400'>{
                formattingDate(item.commentCreateDate)
              }</div>
              <div className='flex gap-2'>
                <LikeIcon></LikeIcon>
                <div>{item.commentLike}</div>
              </div>
              <div className='flex gap-2'>
                <div onClick={() => {
                  setInputReplyData('@' + item.users[0].username + ':');
                  setIsShowPortalState(!isShowPortalState);
                  setGetCommentId(item._id);
                  setGetCommentUserId(item.users[0]._id);
                }}
                  className='cursor-pointer'
                >回复</div>
              </div>
            </div>
            <div className='text-sm text-gray-400 cursor-pointer' onClick={() => toggleReply(item._id)}>
              {item.reply ? `共${item.reply} 条回复,点击查看` : ''}
            </div>
          </footer>
          {showReplyMap[item._id] && replyDataMap[item._id]?.map((reply: any) => (
            <div className='ml-[38px] mt-2' key={reply._id}>
              <header className="flex items-center gap-2">
                <Image width={25} height={25} src={testImg} alt="react logo" />
                <div className="text-xl font-bold">{reply.replyUser.username}</div>@
                <div className="text-xl font-bold text-gray-400">{reply.replyToreplyUser.username}</div>
              </header>
              <div className="text-xl ml-[30px]">{reply.replyText}</div>
              <div className='flex justify-between'>
                <div className='text-gray-400'>{
                  formattingDate(reply.replyCreateDate)
                }</div>
                <div className='flex gap-2'>
                  <LikeIcon></LikeIcon>
                  <div>{reply.replyLike}</div>
                </div>
                <div className='flex gap-2'>
                  <div onClick={() => {
                    setInputReplyData('@' + reply.replyUser.username + ':');
                    setIsShowPortalState(!isShowPortalState);
                    setGetReplyToreplyUserId(reply.replyToreplyUserId);
                    setReplyorComment('reply');
                  }}
                    className='cursor-pointer'
                  >回复</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {isShowPortalState && createPortal(
        <div
          className="flex fixed justify-center items-center  top-0 left-0 w-screen h-screen  bg-gray-800/70 z-50 "
          onClick={() => setIsShowPortalState(!isShowPortalState)}
        >
          <div onClick={(e) => { e.stopPropagation(); }}>
            <form onSubmit={addReply} className='self-center flex flex-row gap-2 items-center mt-2'>
              <input value={inputReplyData} onChange={(e) => { setInputReplyData(e.target.value) }} name="comment" placeholder='  发表评论' className='dark:hover:bg-[#353535] dark:bg-[#0a0a0a] rounded-xl w-[350px] h-[40px] bg-gray-100 hover:bg-gray-200' />
              <Button type="submit">发表</Button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

//获取文章
async function GET(id: string) {
  const res = await fetch(`/api/postget/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
  });
  if (res.headers.get('content-type')?.includes('application/json')) {
    return await res.json();
  } else {
    throw new Error('Unexpected response format');
  }
}
//获取评论
async function GETCOMMENT(id: string) {
  console.log(id)
  const res = await fetch(`/api/comment/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
  });
  if (res.headers.get('content-type')?.includes('application/json')) {
    return await res.json();
  } else {
    throw new Error('Unexpected response format');
  }
}
//添加评论
async function POSTCOMMENT(id: string, data: Comment) {
  const res = await fetch(`/api/comment/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      ...data
    })
  });
  if (res.headers.get('content-type')?.includes('application/json')) {
    return await res.json();
  } else {
    throw new Error('Unexpected response format');
  }
}
//添加回复
async function POSTREPLY(data: any) {
  const res = await fetch(`/api/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      ...data
    })
  });
  if (res.headers.get('content-type')?.includes('application/json')) {
    return await res.json();
  } else {
    throw new Error('Unexpected response format');
  }
}
//获取回复
async function GETREPLY(id: string) {
  const res = await fetch(`/api/reply/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
  });
  if (res.headers.get('content-type')?.includes('application/json')) {
    return await res.json();
  } else {
    throw new Error('Unexpected response format');
  }
}