import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import textImg from "@/assets/test.png";
import AIButton from "@/components/AIButton";
// import AddPortal from "@/components/AddPortal";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getCookie } from "@/util/getcookie";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
interface dataProps {
  index: number,
  title: string,
  url: string,
  image_url: string,
  image_width: number,
  image_height: number,
  label: string,
  label_url: string,
  hot_value: string,
  label_desc: string

}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "towel",
  description: "towel",
};
const resData = async () => {
  try {
    const res = await fetch('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot', {
      method: 'GET',
    })
    return res.json()
  } catch (e) {
    console.log(e)
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await resData()
  const cookie = await getCookie()
  return (
    <html lang="en">
      {/* <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" defer></script> */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  dark:bg-black`}>
        <div className="flex flex-row justify-center items-center gap-2">
          {/* <AddPortal></AddPortal> */}
          <header className="w-[200px] h-screen dark:bg-[#0a0a0a] bg-white flex flex-col gap-2">
            <Link href='/'>主页</Link>
            <AIButton></AIButton>
            <Link href='/ai'>AI</Link>
            <Link href='/message'>消息</Link>
            <Link href='/setting'>设置</Link>
            <Link href='/user'>{cookie ? '我的' : '登录'}</Link>
          </header>
          <main className="w-[500px] h-screen  dark:bg-[#0a0a0a] bg-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
            <Analytics></Analytics>
            <SpeedInsights />
          </main>
          <footer className="w-[200px] h-screen dark:bg-[#0a0a0a]  bg-white flex flex-col gap-2">
            <form className="flex flex-row items-center gap-2">
              <input type="text" placeholder="  搜索" className="h-[32px] w-[150px] dark:bg-[#0a0a0a] dark:hover:bg-[#353535]   bg-gray-100 hover:bg-gray-200 rounded-xl" />
              <Button>搜索</Button>
            </form>
            {/* 推荐关注 */}
            <div className=" flex flex-col w-full space-y-2 ">
              <div className="self-center">推荐关注</div>
              <div className="flex flex-row items-center justify-between ">
                <Image width={20} height={20} src={textImg} alt="header iamge"></Image>
                <Button>关注</Button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Image width={20} height={20} src={textImg} alt="header iamge"></Image>
                <Button>关注</Button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Image width={20} height={20} src={textImg} alt="header iamge"></Image>
                <Button>关注</Button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Image width={20} height={20} src={textImg} alt="header iamge"></Image>
                <Button>关注</Button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Image width={20} height={20} src={textImg} alt="header iamge"></Image>
                <Button>关注</Button>
              </div>
            </div>
            {/* 今日头条 */}
            <div className="w-full flex flex-col">
              <div className="self-center">今日头条</div>
              <div className="w-full ">
                {data.data.slice(1, 5).map((item: dataProps) => (
                  <Link key={item.index} href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className=" dark:bg-[#0a0a0a] bg-gray-100 hover:bg-gray-200 dark:hover:bg-[#353535] w-full  rounded-xl p-2 mb-2">
                      <div>{item.title}</div>
                      <div>{item.hot_value}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>github 视频 小程序</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
