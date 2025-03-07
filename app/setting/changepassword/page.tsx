"use client"
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import TowelButton from '@/components/ui/towel-button'

const formSchema = z.object({
  oldPassword: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }).max(20, {
    message: "Username must be at least 6 characters.",
  }),
  NewPassword: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }).max(20, {
    message: "Username must be at least 20 characters.",
  }),
  confirmpassword: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }).max(20, {
    message: "Username must be at least 20 characters.",
  }),
})
async function POSTFORGET(data: any) {
  if (!data) { return }
  const res = await fetch(`${process.env.ORIGIN}/api/changepassword`, {
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
export default function Page() {
  const [cookie, setCookie] = useState<string>("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      NewPassword: "",
      confirmpassword: "",
    },
  })

  useEffect(() => {
    fetch('/api/cookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json()
      setCookie(data?.userid)
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = {
      userid: cookie,
      oldPassword: values.oldPassword,
      newPassword: values.NewPassword,
      confirmPassword: values.confirmpassword,
    }
    await POSTFORGET(data)
    
  }
  return (
    <div className='w-full flex flex-col justifu-center items-center'>
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} className=" self-center space-y-4  w-[300px] flex  justifu-center items-center flex-col">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className='w-full flex flex-col  justifu-center items-center'>
                <FormLabel className='self-start'>oldPassword</FormLabel>
                <FormControl>
                  <Input className='w-full' type='text' placeholder="oldPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="NewPassword"
            render={({ field }) => (
              <FormItem className='w-full flex flex-col  justifu-center items-center'>
                <FormLabel className='self-start'>NewPassword</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="NewPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem className='w-full flex flex-col  justifu-center items-center'>
                <FormLabel className='self-start'>confirmpassword</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="confirmpassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TowelButton type="submit">Submit</TowelButton>
        </form>
      </Form>
    </div>
  )
}
