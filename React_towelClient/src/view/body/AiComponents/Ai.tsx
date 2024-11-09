import React, { useState } from 'react'
import { postAi } from '../../../services/ai/ai'
import useLocalStorage from '../../../hooks/useLocaStorage';
import { resData } from '../../../types/body/aiComponents/Ai';
export default function Ai() {
    const [inputData, setInputData] = useState('')
    const [resData, setResData] = useState<resData[]>([])
    const [localStorageData] = useLocalStorage()
    const [loading, setLoading] = useState(false)
    const postAiHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setResData(item => item.concat({ content: inputData, sendid: localStorageData.userid, headimg: localStorageData.headimg }))
        postAi(inputData).then((res) => {
            setLoading(false)
            setResData(item => item.concat({ content: res.data.content, sendid: 'llama', headimg: 'https://ollama.com/public/ollama.png' }))
            setInputData('')
        })
    }
    return (
        <div className='w-full  px-2 py-2 text-[--fontColor]'>
            <div className='space-y-12 mb-1/6 flex-1 overflow-auto px-2 pb-32 flex flex-col'>
                {resData.map((item, index) => (
                    <div key={index} className={['flex', 'space-x-2', localStorageData.userid === item.sendid ? 'self-end' : 'self-start'].join(' ')}>
                        <img className={['w-10', 'h-10', 'rounded-full', localStorageData.userid === item.sendid ? 'order-1' : ''].join(' ')} src={item.headimg} alt="User avatar" />
                        <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'>
                            {item.content}
                        </span>
                    </div>
                ))}
                {loading ?
                    <div> loadin...</div> : ''
                }
            </div>
            <form onSubmit={postAiHandler} className=' fixed  bottom-14 w-full md:w-[90%] lg:w-[40%] h-10 flex space-x-2 justify-center items-center '>
                <input className='lg:w-full basis-1/2   bg-[--boxColor] h-10 rounded-my-rounded-10px focus:border-[--assistantColor]' value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='评论'></input>
                <button type='submit' className='h-10 basis-1/4    p-2 w-fit text-nowrap rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor] ' >发表</button>
            </form>
        </div>
    )
}
