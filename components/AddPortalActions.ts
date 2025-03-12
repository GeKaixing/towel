'use server'
import { revalidateTag } from "next/cache";

export async function POST(data: any) {
    const res = await fetch(`${process.env.ORIGIN}/api/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
            UserId: data.UserId,
            Image: data.Image,
            Text: data.Text,
            Share: data.Share,
            Like: data.Like,
            Comment: data.Comment,
            Video: data.Video,
            createDate: data.createDate,
        }),
    });
    
    // 确保在服务器操作完成后重新验证
    await revalidateTag('post');
    return res.json();
}