import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot', {
        method: 'GET',
    })
    const data = await res.json()
    return NextResponse.json(data)
}
