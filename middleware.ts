export { auth  } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 定义需要保护的路径
const protectedRoutes = ["/user", "/add",'/ai','/message','/setting']; // 需要登录才能访问的路径
const authRoutes = ["/login", "/signup"]; // 登录和注册页面，已登录用户不能访问

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value; // 从 cookies 中获取 token

  // 如果用户未登录且访问受保护的路由，重定向到登录页
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 如果用户已登录且访问登录/注册页，重定向到首页
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 允许访问
  return NextResponse.next();
}

// 配置 Middleware 生效的路由
export const config = {
  // 对所有路由生效
  matcher: "/:path*",
};
