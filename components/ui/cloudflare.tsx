'use client'
import { isForbid } from '@/store/isForbid'
import { Turnstile } from '@marsidev/react-turnstile'
import React from 'react'

export default function Cloudflare() {
    const { setForbid } = isForbid()
    return <Turnstile
        as='aside'
        options={{
            action: 'submit-form',
            theme: 'light',
            size: 'normal',
            language: 'zh-cn',
        }}
        onError={() => setForbid('error')}
        onExpire={() => setForbid('expired')}
        onSuccess={() => setForbid('solved')}
        siteKey={process.env.NEXT_PUBLIC_SITEKEY as string} />
    // 0x4AAAAAAA29v_Xw_aJnuwbi

}