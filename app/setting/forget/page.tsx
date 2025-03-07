import Button from '@/components/Button';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import React from 'react';
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Input } from '@/components/ui/input';
const typeSafe = z.object({
  oldPassword: z.string().min(6).max(20),
  newPassword: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20),
})
async function POSTFORGET(data: any) {
  if (!data) { return }
  const res = await fetch(`${process.env.ORIGIN}/api/forget`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data
    }),
    credentials: 'include'
  })
  return await res.json()
}
// Define the server action separately
async function handleFormSubmit(formData: FormData) {
  'use server';
  const data = {
    oldPassword: formData.get('oldpassword'),
    newPassword: formData.get('newpassword'),
    confirmPassword: formData.get('confirmpassword')
  }
  if (typeSafe.safeParse(data).success) return;
  const cookieStore: ReadonlyRequestCookies = await cookies();
  if (!cookieStore) return;
  const cookie = cookieStore.get('jwt')
  if (typeof cookie === 'object') {
    if (typeof cookie.value === 'string') {
      const decoded = jwt.verify(cookie.value, process.env.JWT_SECRET).userid
      const data = {
        userid: decoded,
        oldPassword: formData.get('oldpassword'),
        newPassword: formData.get('newpassword'),
        confirmPassword: formData.get('confirmpassword'),
      }
      const res = await POSTFORGET(data)
      console.log(res)
    }
  }
  // Add your logic here to handle the form submission
}

export default function Page() {
  return (  
    <form action={handleFormSubmit} className='flex flex-col gap-2'>
      <Input name='oldpassword' type='password' placeholder="oldpassword"></Input>
      <Input name='newpassword' type='password' placeholder="newpassword"></Input>
      <Input name='confirmpassword' type='password' placeholder="confirmpassword"></Input>
      <Button type="submit">提交</Button>
    </form>
  );
}
