import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './User.module.css'
import axios from 'axios';
import sreachIcon from '../../assets/static/otherIcon/搜索.svg'
import sreachPitchIcon from '../../assets/static/otherIconPitchUp/搜索.svg'
import headimgIcon from '../../assets/static/otherIcon/head-img.svg'
export default function User() {
    // 解构login的state
    const [localStorageData, setLocalStorage] = useState({})
    const [searchData, setSearechData] = useState('')
    const navigate = useNavigate()
    const [mouseOver, setMouseOver] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            setLocalStorage(JSON.parse(localStorage.getItem('loginData')))
        }
    }, [localStorage])
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
        <div className='  w-[20%] mr-[10%] max-lg:hidden'>
            <section className='sticky top-2 mb-4'>
                <form className={style.search} onSubmit={(e) => { e.preventDefault() }} >
                    <input className='w-full bg-[--boxColor] border-none rounded-my-rounded-10px' type='text' placeholder='search more' value={searchData} onChange={(e) => { e.preventDefault(); setSearechData(e.target.value) }}></input>
                    <img  onClick={searchDataApi} className={style.SearchOutlined}
                        onMouseEnter={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        src={mouseOver ? sreachPitchIcon:sreachIcon} alt="搜索" />
                </form>
            </section>

            {localStorageData.jwt ?
                <div className='w-full flex bg-[--boxColor] rounded-my-rounded-10px p-2 items-center space-x-2'>
                    <div className='  '>
                        <img src={localStorageData.headimg} className='w-10 h-10 rounded-full'></img>
                    </div>
                    <Link className='font-bold' to={`/userhomepage/${localStorageData.userid}`}>{localStorageData.username}</Link>
                </div> : null}

            <div className='flex flex-col items-center w-full'>
                <div>推荐关注</div>
                <div className='flex  flex-col px-2 justify-between w-full space-y-2'>
                    <div className='flex flex-row justify-between w-full'> <div className='w-8 h-8  flex-shrink-0 flex-nowrap rounded-full border-none object-cover'><img src={headimgIcon}></img></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div>关注</div></div>
                    <div className='flex flex-row justify-between w-full'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap bg-black rounded-full border-none overflow-hidden'></div><Link to={`/userhomepage/${localStorageData.userid}`} className="text-[--fontColor] ">{localStorageData.username}</Link><div>关注</div></div>
                    <div className='flex flex-row justify-between w-full'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap bg-black rounded-full border-none overflow-hidden'></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div>关注</div></div>
                    <div className='flex flex-row justify-between w-full'> <div className='w-8 h-8 flex-shrink-0 flex-nowrap bg-black rounded-full border-none overflow-hidden'></div><Link to={`/userhomepage/${localStorageData.userid}`} className='text-[--fontColor] '>{localStorageData.username}</Link><div>关注</div></div>
                </div>
                <div>更多...</div>
            </div>
        </div>

    )
}
