"use client";
import { isShowPortal } from "@/store/isShowPortal";
import React, { useTransition } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import Image from "next/image";
import testImg from "@/assets/test.png";
// import { isRefresh } from '@/store/isRefresh';
import { POST } from "./AddPortalActions";

export default function AddPortal() {
  const isShowPortalState = isShowPortal((state) => state.isShow);
  const [data, setData] = React.useState("");
  const setIsShow = isShowPortal((state) => state.setIsShow);
  // const setRefresh = isRefresh((state) => state.setRefresh);

  const postHandel = async () => {
    if (data === "") return alert("请输入内容");
    const UserId = JSON.parse(
      localStorage.getItem("userinfo") as string
    ).userid;
    const postData = {
      UserId,
      Image: "",
      Text: data,
      Share: 0,
      Like: 0,
      Comment: 0,
      Video: "",
      Title: "",
      createDate: new Date(),
    };
    try {
      await POST(postData);
      setData("");
      setIsShow();
      // 强制刷新页面内容
      window.location.reload();
    } catch (error) {
      console.error("发布失败:", error);
      alert("发布失败，请重试");
    }
  };

  // 阻止事件冒泡
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const [isPending, startTransition] = useTransition();
  console.log(isPending)
  return (
    <>
      {isShowPortalState &&
        createPortal(
          <div
            className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-gray-800/70 z-50"
            onClick={() => {
              setIsShow();
            }} // 点击外部区域关闭模态框
          >
            <div
              className="
                        dark:bg-[#0a0a0a]
                        dark:border-[#0a0a0a]
                        dark:hover:border-[#353535]
                        flex flex-col gap-2 w-[400px] border-2 border-gray-100 hover:border-gray-200 p-2 rounded-xl bg-white"
              onClick={handleModalClick} // 阻止事件冒泡到父元素
            >
              <header className="flex justify-between">
                <Button onClick={() => setIsShow()}>取 消</Button>
                <Button
                  onClick={() =>
                    startTransition(() => {
                      postHandel();
                    })
                  }
                >
                  发布
                </Button>
              </header>
              <main className="flex gap-2">
                <aside className="flex flex-col gap-2 items-center">
                  <Image
                    width={30}
                    height={30}
                    src={testImg}
                    alt="react logo"
                  />
                  <Image
                    width={20}
                    height={20}
                    src={testImg}
                    alt="react logo"
                  />
                  <Image
                    width={20}
                    height={20}
                    src={testImg}
                    alt="react logo"
                  />
                </aside>
                <textarea
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="
                                dark:text-black
                                w-full h-[60px] bg-gray-100 hover:bg-gray-200 rounded-xl p-2"
                  placeholder="  发表评论"
                />
              </main>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
