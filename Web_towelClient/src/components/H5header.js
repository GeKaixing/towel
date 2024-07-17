import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router'

export default function H5header() {
    const [cc, setcc] = useState('')
   const navigate= useNavigate()
    const { pathname } = useLocation()
    const dd = () => {
        switch (pathname.split('/')[1]) {

            case 'post':
                setcc('添加')
                break;
            case 'about':
                setcc('关于')
                break;
            case 'Message':
                setcc('消息')
                break;
            case 'setting':
                setcc('设置')
                break;
            case 'homepage':
                setcc('个人')
            case 'login':
                setcc('登录')
                break;
            case 'signup':
                setcc('注册')
                break;
            default:
                setcc('帖子')
        }
    }
    useEffect(() => {
        dd()
    }, [pathname])
    const [searchData, setSearechData] = useState('')
    const [mouseOver, setMouseOver] = useState(false);
    const searchDataApi = () => {
        axios({
            url: 'http://127.0.0.1:4000/fliterpsot',
            method: 'post',
            data: {
                data: {
                    postText: searchData
                }
            }
        })
            .then((response) => {
                navigate(`/search`, { state: response.data });
                setSearechData('')
            })
            .catch((error) => { console.log(error) })
    }
    return (
        <div className='md:hidden flex items-center space-x-2 mt-2 mb-2 text-[--fontColor]  justify-between border-[--boxColor] hover:border-[--boxHoverColor] border-solid border-b-2 ' >
            <div className='flex w-1/2 items-center space-x-2  ml-2 '> 
                <button className='w-10 h-10 bg-[--boxColor] rounded-full  flex justify-center items-center' onClick={() => window.history.back()}>
                    <img src='/static/otherIcon/左_left.svg'></img>
                </button>
                <div>{cc}</div>
            </div>


            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className='w-10 h-10 self-center absolute left-1/2 -translate-x-1/2' onClick={() => window.scrollTo({ top: 0 })}></img>

            <div className='w-56 flex space-x-2 self-center justify-end mr-2 '>
                <input className=' w-1/2 bg-[--boxColor] border-none rounded-my-rounded-10px ' type='text' placeholder='search more' value={searchData} onChange={(e) => { e.preventDefault(); setSearechData(e.target.value) }}></input>
                <img onClick={searchDataApi} className='w-6 h-6'
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    src={`${process.env.PUBLIC_URL}/static/${mouseOver ? 'otherIconPitchUp' : 'otherIcon'}/搜索.svg`} alt="搜索" />
            </div>
        </div>
    )
}
