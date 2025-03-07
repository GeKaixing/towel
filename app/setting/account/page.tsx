import React from 'react';
import { cookies } from 'next/headers'; // 从 cookies 中获取用户信息
import jwt from 'jsonwebtoken';
import OutButton from './_outButton';

export default async function Page() {
    // 从 cookies 中获取用户信息
    const userinfo = await cookies()
    const token = userinfo.get('jwt')?.value;
    let decoded = null;
    let res = null;
    if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // 使用相同的密钥
        res = decoded ? await GETaccount(decoded.userid) : null;
    }
    return (
        <div>
            <h1>用户信息</h1>
            {/* 将数据传递给客户端组件 */}
            <p>用户名：{res?.username}</p>
            <p>邮箱：{res?.email}</p>
            <p>创建时间：{res?.createDate}</p>
            <p>头像：{res?.headimg}</p>
            <p>电话：{res?.phoneNumber}</p>
            <p>生日：{res?.birthday || '还没有设置'}</p>
            <OutButton></OutButton>
        </div>
    );
}

async function GETaccount(userid: string) {
    const res = await fetch(`http://localhost:3000/api/profile/account/${userid}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
        credentials: "include",
    });
    return await res.json();;
}