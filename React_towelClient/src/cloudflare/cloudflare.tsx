import { Turnstile } from '@marsidev/react-turnstile'
import React from 'react'
import { useState } from 'react'

export default function Widget() {
    const [status, setStatus] = useState<String>()

    return <Turnstile
        as='aside'
        options={{
            action: 'submit-form',
            theme: 'light',
            size: 'normal',
            language: 'zh-cn',
        }}
        onError={() => setStatus('error')}
        onExpire={() => setStatus('expired')}
        onSuccess={() => setStatus('solved')}
        siteKey='1x00000000000000000000AA' />
}