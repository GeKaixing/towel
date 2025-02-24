import { open } from "../config"

export const postAi =async (context) => {
    // return open({ url: `llama`,method:'post',data:{data:{context}}})
    //@ts-ignore
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}llama`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: { context } })
    });
    return response;
 }
export const postDeepSeekAi =async (context) => {
    // return open({ url: `llama`,method:'post',data:{data:{context}}})
    //@ts-ignore
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}deepseek`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: { context } })
    });
    return response;
 }