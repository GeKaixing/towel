import Image from "next/image";
import testImg from "@/assets/test.png";
import Link from "next/link";
import { CommentIcon, LikeIcon, ShareIcon, StarIcon } from "@/components/icon";
import MoreButton from "@/components/MoreButton";
import { getCookie } from "@/util/getcookie";

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
export default async function Home() {
  const posts = await GET();
  const cookie = await getCookie();
  return (
    <div className="space-y-2">
      {posts.map((item) => (
        <div
          key={item.postCreateDate}
          className="w-full border-2 dark:hover:border-[#353535] dark:border-[#0a0a0a]  border-gray-100 hover:border-gray-200 p-2 rounded-xl "
        >
          <header className="flex justify-between items-center gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Image
                width={30}
                height={30}
                src={testImg}
                alt="react logo"
              ></Image>
              <div className="font-bold">{item.user.username}</div>
            </div>
              <MoreButton  userId={cookie?.userid} postUserid={item.postUserId} postId={item._id}></MoreButton>
          </header>
          <Link href={`/post/${item._id}`}>
            <main className="mt-2 mb-2 ">
              <div className="font-bold ">{item.postText}</div>
            </main>
          </Link>
          <footer className="flex justify-between">
            <div className="flex items-center gap-2">
              <LikeIcon></LikeIcon>
              <span className=" text-gray-400 hover:text-gray-800">
                {item.postLike}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CommentIcon></CommentIcon>
              <span className=" text-gray-400 hover:text-gray-800">
                {item.postComment}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon></StarIcon>
              <span className=" text-gray-400 hover:text-gray-800">
                {item.postFavorite}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShareIcon></ShareIcon>
            </div>
          </footer>
        </div>
      ))}
    </div>
  );
}
async function GET(): Promise<Post[]> {
  const res = await fetch(`${process.env.ORIGIN}/api/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["post"],
    },
  });
  return await [];
}
