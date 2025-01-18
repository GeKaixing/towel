import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import leftIcon from '../assets/static/otherIcon/左_left.svg'
import sreachIcon from '../assets/static/otherIcon/搜索.svg'
import sreachPithIcon from '../assets/static/otherIconPitchUp/搜索.svg'
import settingIcon from "../assets/static/MainMenuIcon/设置.svg"

export default function H5header() {
    const [titlte, setTitlte] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const dd = () => {
        switch (pathname.split('/')[1]) {
            case 'post':
                setTitlte('添加')
                break;
            case 'about':
                setTitlte('关于')
                break;
            case 'search':
                setTitlte('搜索')
                break;
            case 'Message':
                setTitlte('消息')
                break;
            case 'setting':
                setTitlte('设置')
                break;
            case 'homepage':
                setTitlte('个人')
                break;
            case 'login':
                setTitlte('登录')
                break;
            case 'signup':
                setTitlte('注册')
                break;
            default:
                setTitlte('帖子')
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
    const pushSettingHandler = () => {
        navigate(`/setting`)
    }
    const pushSearchHandler = () => {
        navigate(`/search`)
    }
    return (
        <div className='md:hidden flex items-center space-x-2 mt-2 mb-2 text-[--fontColor] h-10 justify-between   ' >
            <div className='flex w-1/2 items-center space-x-2  ml-2 '>
                {pathname === '/' ?
                    <img src={settingIcon} className='w-[26px] h-10-[26px]' onClick={pushSettingHandler}  ></img>
                    :
                    <>
                        <button className='w-10 h-10 bg-[--boxColor] rounded-full  flex justify-center items-center' onClick={() => window.history.back()}>
                            <img src={leftIcon}></img>
                        </button>
                        <div>{titlte}</div>
                    </>
                }

            </div>
            {/* global process*/}
            {pathname === '/' && <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className='w-10 h-10 self-center absolute left-1/2 -translate-x-1/2' onClick={() => window.scrollTo({ top: 0 })}></img>}
            {pathname === '/search' ?
                <form className=' h-10 w-[80%]'>
                    <input className='w-full h-full bg-[--boxColor] rounded-my-rounded-10px 'placeholder='&nbsp;&nbsp;搜索'></input>
                </form>
                :
                null
            }
            <div className='self-center justify-end' onClick={pushSearchHandler}>
                {/* <input className=' w-1/2 bg-[--boxColor] border-none rounded-my-rounded-10px ' type='text' placeholder='search more' value={searchData} onChange={(e) => { e.preventDefault(); setSearechData(e.target.value) }}></input> */}
                <img className='w-6 h-6 mr-2'
                    src={sreachIcon} alt="搜索" />  
            </div>

        </div>
    )
}
