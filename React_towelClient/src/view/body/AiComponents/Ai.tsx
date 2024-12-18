import React, { useState } from 'react'
import { postAi } from '../../../services/ai/ai'
import useLocalStorage from '../../../hooks/useLocaStorage';
import { resData } from '../../../types/body/aiComponents/Ai';
import { useLanguage } from '../../../store/LanguageContext';
interface ResDataItem {
    content: string;
    sendid: string;
    headimg: string;
}
export default function Ai() {
    const { t } = useLanguage();
    const [inputData, setInputData] = useState('')
    const [resData, setResData] = useState<ResDataItem[]>([])
    const [localStorageData] = useLocalStorage()
    const [loading, setLoading] = useState(false)
    const postAiHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setResData(item => item.concat({ content: inputData, sendid: localStorageData.userid, headimg: localStorageData.headimg }))
        try {
            const res = await postAi(inputData);
            const reader = res.body?.getReader()!;
            const textdecoder = new TextDecoder();
            let done = false;
            let text = '';
            const resDataIndex = resData.length
            while (!done) {
                const { value, done: isdone } = await reader.read();
                const chunk = textdecoder.decode(value, { stream: true });
                const jsonResponse = await JSON.parse(chunk)
                const newContent = jsonResponse?.message?.content
                done = isdone

                if (newContent) {
                    text += newContent;
                    setResData((prevData) => {
                        let newHistory: any;
                        // 如果聊天记录最后一条不是AI，则拼接一条AI回答对象
                        if (prevData[prevData.length - 1].sendid !== "llama") {
                            newHistory = [
                                ...prevData,
                                {
                                    content: text,
                                    sendid: 'llama',
                                    headimg: 'https://ollama.com/public/ollama.png',
                                },
                            ];
                        } else {
                            // 聊天记录最后一条是AI,则直接在机器人回答的内容后面拼接新回答
                            prevData[prevData.length - 1].content = prevData[prevData.length - 1].content + text;
                            // 不能直接history赋值，要加上[... ]生成新对象,否则setState会认为引用地址没变，不执行页面刷新
                            newHistory = [...prevData];
                        }
                        return newHistory

                    })
                }

            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setInputData('')
        }

    }
    return (
        <div className='w-full  px-2 py-2 text-[--fontColor]'>
            <div className='space-y-12 mb-1/6 flex-1 overflow-auto px-2 pb-32 flex flex-col'>
                {resData.map((item, index) => (
                    <div key={index} className={['flex', 'space-x-2', localStorageData.userid === item.sendid ? 'self-end' : 'self-start'].join(' ')}>
                        <img className={['w-10', 'h-10', 'rounded-full', "object-contain", localStorageData.userid === item.sendid ? 'order-1' : ''].join(' ')} src={item.headimg} alt="User avatar" />
                        <span className='p-2 border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'>
                            {item.content}
                        </span>
                    </div>
                ))}
                {loading ?
                    <div> loading...</div> : ''
                }
            </div>
            <form onSubmit={postAiHandler} className=' fixed  bottom-14 w-full md:w-[90%] lg:w-[40%] h-10 flex space-x-2 justify-center items-center '>
                <input className='lg:w-full basis-1/2   bg-[--boxColor] h-10 rounded-my-rounded-10px focus:border-[--assistantColor]' value={inputData} onChange={(e) => setInputData(e.target.value)}></input>
                <button type='submit' className='h-10 basis-1/4    p-2 w-fit text-nowrap rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor] ' >{t('send')}</button>
            </form>
        </div>
    )
}
