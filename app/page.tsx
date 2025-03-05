"use client"
import Image from "next/image";
import testImg from "@/assets/test.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isRefresh } from "@/store/isRefresh";
import { CommentIcon, LikeIcon, ShareIcon, StarIcon } from "@/components/icon";
// import SignIn from "@/components/sign-in";

interface Post {
  _id: string;
  postCreateDate: string;
  postUserId: string;
  user: {
    username: string;
  };
  postText: string;
  postLike: number;
  postComment: number;
  postFavorite: number;
}
export default function Home() {
  const isRefreshStore = isRefresh((state) => state.isRefresh)
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await GET();
      setPosts(res);
    };
    fetchPosts();
  }, [isRefreshStore])
  return (
    <div className="space-y-2">
      {/* <SignIn></SignIn> */}
      {posts.map((item) => (
        <div key={item.postCreateDate} className="w-full border-2 dark:hover:border-[#353535] dark:border-[#0a0a0a]  border-gray-100 hover:border-gray-200 p-2 rounded-xl ">
          <Link href={`/post/${item._id}`}  >
            <header className="flex items-center gap-2">
              <Image width={30} height={30} src={testImg} alt="react logo"></Image>
              <div className="font-bold">{item.user.username}</div>
            </header>
            <main className="mt-2 mb-2 ">
              <div className="font-bold ">{item.postText}</div>
            </main>
            <footer className="flex justify-between">
              <div className="flex items-center gap-2">
                <LikeIcon></LikeIcon>
                <span className=" text-gray-400 hover:text-gray-800">{item.postLike}</span>
              </div>
              <div className="flex items-center gap-2">
                <CommentIcon></CommentIcon>
                <span className=" text-gray-400 hover:text-gray-800">{item.postComment}</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon></StarIcon>
                <span className=" text-gray-400 hover:text-gray-800">{item.postFavorite}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShareIcon></ShareIcon>
              </div>
            </footer>
          </Link>
        </div>
      ))}
    </div >
  );
}
async function GET() {
  const res = await fetch('/api/post', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}
