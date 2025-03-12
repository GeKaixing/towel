"use client";
import React, { useState, useTransition } from "react";
import submit from "./MoreButtonActions";

export default function MoreButton({
  userId,
  postUserid,
  postId,
  ...props
}: {
  userId: string;
  postUserid: string;
  postId: string;
}) {
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <div className="relative cursor-pointer">
      {show && (
        <div
          className=" absolute  right-4 top-4 w-auto h-auto
          flex flex-col gap-2 flex-nowrap 
          "
        >
          {userId === postUserid && (
            <div
              className=" whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  submit(postId);
                });
              }}
            >
              {isPending?'删除成功':'删除'}
            </div>
          )}
          <div className="whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
            举报
          </div>
        </div>
      )}
      <div
        {...props}
        onClickCapture={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setShow(!show);
        }}
      >
        ...
      </div>
    </div>
  );
}
