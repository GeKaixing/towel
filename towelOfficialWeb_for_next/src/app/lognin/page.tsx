import React from 'react'

export default function page() {
  return (
    <div>
        <form className='flex flex-col space-y-2 j items-center'>
            <div className='flex flex-col'>
            <label htmlFor='name' className='self-start text-gray-500'>名字</label>
            <input id='name' type='text' required maxLength={4}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor='password' className='text-gray-500'>密码</label>
            <input id='password' type='password' required/>
            </div>
            <input className='w-40 h-10 rounded-lg  bg-[--hostColor]' type='submit'required></input>
        </form>
      </div>
  )
}
