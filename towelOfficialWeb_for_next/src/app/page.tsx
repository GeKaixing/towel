'use client'
import Image from "next/image";
import Link from "next/link";
import add from './asset/add.png'
import home from './asset/home.png'
import about from './asset/about.png'
import setting from './asset/setting.png'
import user from './asset/user.png'
import blog from './asset/blog.png'
import llama from './asset/llama.png'
import wexinapp from './asset/wexinapp.png'
import { useState } from "react";
export default function Home() {
  const [isWeixinminiappIcon, setIsWeixinminiappIcon] = useState(false);
  return (
      <main className="flex flex-col justify-center items-center">
        <h1 className="text-4xl lg:text-6xl">开源论坛</h1>
        <h2 className=" lg:text-4xl">使用它来面试</h2>
        <h2 className=" lg:text-xl">一个小程序 移动端 WEB端的应用</h2>
        <Link href='https://github.com/GeKaixing/towel' className="w-40 h-10 rounded-lg mt-4  flex justify-center items-center bg-[--assistantColor] text-black font-bold ">仓库地址</Link>
        <Link href='https://gekaixing.top' className="w-40 h-10 rounded-lg mt-4 mb-10 flex justify-center items-center bg-[--hostColor] text-black font-bold ">在线预览</Link>
        <div className="flex flex-col space-y-2 items-center mb-4 lg:w-1/2 lg:space-y-5">
          <Image src={home} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={about} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={add} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={blog} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={setting} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={user} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Image src={llama} width='300' height='300' alt={"添加"} className="lg:w-full"></Image>
          <Link href='https://gekaixing.top' className="text-bold">预览更多...</Link>
        </div>
        <hr className="h-2 w-full lg:w-1/2"></hr>
        <div className="flex justify-between w-full px-2 lg:w-1/2">
          <Link href='/'>
            <img src='https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/logo.png' className="w-5 h-5 object-cover"></img>
          </Link>
          <div className="flex space-x-2 ">
            <Link href='https://github.com/GeKaixing/towel' target="_blank" rel="noopener noreferrer">github</Link>
            <p onMouseEnter={() => setIsWeixinminiappIcon(!isWeixinminiappIcon)} onMouseLeave={() => setIsWeixinminiappIcon(!isWeixinminiappIcon)}>小程序
              {isWeixinminiappIcon &&
                <div className='w-40 h-40 absolute flex flex-col items-center'>
                  <Image className='w-32 h-32 object-cover' src={wexinapp} alt='微信小程序二维码'></Image>
                  <p>微信扫码</p>
                </div>
              }
            </p>
            <Link href='https://www.bilibili.com/video/BV1hMYdeDES3/?spm_id_from=333.999.0.0' target="_blank" rel="noopener noreferrer">bilibili</Link>
          </div>
        </div>
        <div className="flex space-x-44 mb-2 ">
          <div className="flex flex-col space-y-2 justify-star ">
            <p className="font-bold text-lg">资源</p>
            <Link href='/blog'>博客</Link>
            <Link href='/docs'>文档</Link>
            <Link href='https://www.figma.com/design/e13QKKoeeCC2t0cufq3cUp/towel?m=auto&t=w9M5U50Kbn8FrIIS-6'>ui/ux</Link>
          </div>
          <div className="flex flex-col justify-start  space-y-2">
            <p className="font-bold text-lg">关于我</p>
            <Link href='https://github.com/GeKaixing'>我</Link>
            <Link href='https://github.com/GeKaixing'>联系我</Link>
            <Link href="https://gekaixing.top">towel</Link>
          </div>
        </div>
      </main>
  );
}
