"use client";
import React, { useState } from "react";

export default function MoreButton({
  userId,
  postUserid,
  ...props
}: {
  userId: string;
  postUserid: string;
}) {
  console.log(userId, postUserid);
  const [show, setShow] = useState(false);
  return (
    <div className="relative cursor-pointer">
      {show && (
        <div
          className=" absolute  right-4 top-4 w-auto h-auto
          flex flex-col gap-2 flex-nowrap 
          "
        >
          {userId === postUserid && (
            <div className=" whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              删除
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
