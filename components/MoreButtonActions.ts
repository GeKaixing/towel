"use server";

import { revalidateTag } from "next/cache";
async function delpost(postId: string) {
  const res = await fetch(`${process.env.ORIGIN}/api/post`, {
    method: "DELETE",
    body: JSON.stringify({ postId }),
  });
  return res.json();
}
export default async function submit(postId:string) {
  await delpost(postId);
  revalidateTag("posts");
}
