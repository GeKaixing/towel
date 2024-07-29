import React, { useState } from 'react'
import addImgaIcon from '../../../assets/static/otherIcon/图片添加.svg'
export default function PrivateChat() {
    const [textLength, setTextLength] = useState('')
    return (
        <div className='w-full'>
            <header className='flex justify-center w-full mb-2 text-lg font-bold'>name</header>{/* header */}
            <main className='space-y-12 mb-1/6  h-1/2 overflow-auto'>
                <div className='flex '>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                    <span className='text-lg font-bold mr-2'>:</span>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
                <div className='flex '>
                    <span className='border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-2 rounded-my-rounded-10px'> Cillum aliquip culpa adipisicing laboris fugiat in cillum eu ea labore. Sit aute id aute laboris dolor. Enim occaecat eiusmod non officia Lorem sint incididunt anim nisi enim nostrud amet deserunt. Laboris sint ad pariatur et ad magna nisi quis sit Lorem.</span>
                    <span className='text-lg font-bold ml-2'>:</span>
                    <img className='w-10 h-10 rounded-full' src='https://github.com/GeKaixing/towel/blob/main/README_static/logo.png?raw=true'></img>
                </div>
            </main>
            <div className=' w-full h-1/6'>
                <form className='fixed  bottom-2 w-full lg:w-[40%] h-1/6 ' onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor='send-file' className='absolute top-2 left-2'>
                        <img className='w-10 h-10' src={addImgaIcon} alt='添加图片'></img>
                    </label>
                    <input type='file' id='send-file' className='hidden'></input>
                    <textarea value={textLength} onChange={(e) => setTextLength(e.target.value)} resize='none' maxLength="500" className='pt-10 resize-none w-full h-full border-[--fontColor] hover:border-[--fontColor] border-solid border-2 rounded-my-rounded-10px'></textarea>
                    <span className='absolute bottom-3 right-2 space-x-2'>
                        <span>
                            {textLength.length}/500
                        </span>
                        <button className='w-[4rem] h-8 rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--assistantColor] hover:text-[--hostColor]'>发送</button>
                    </span>
                </form>
            </div>
        </div>
    )
}
