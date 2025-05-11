"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react"

type GoogleAuthButtonProps = {

  buttonText: string;
  className?: string;
};

export default function GoogleAuthButton({

  buttonText,
  className,
}: GoogleAuthButtonProps) {
    function handlerclick(){
      signIn("google", { callbackUrl: "/" })
  }
  return (
    <button
      type="button"
      className={clsx(
        "w-full flex items-center h-10 justify-center py-3 px-4 border border-[#4A4A4A] rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors mt-6 text-black",
        className
      )}
      onClick={handlerclick}
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
        className="mr-2"
      />
      {buttonText}
    </button>
  );
}
