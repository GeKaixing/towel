"use client"
import React from 'react'
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
  username: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }).max(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }).max(20, {
    message: "Username must be at least 20 characters.",
  }),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-[300px] flex  flex-shrink-0 flex-col">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className='w-full' type='text' placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TowelButton type="submit">Submit</TowelButton>
      </form>
    </Form>

  )
}
