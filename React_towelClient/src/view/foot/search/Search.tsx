import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import sreachIcon from '../../../assets/static/otherIcon/搜索.svg'
import sreachPitchIcon from '../../../assets/static/otherIconPitchUp/搜索.svg'
export default function Search() {
    const [searchData, setSearechData] = useState('')
    const navigate = useNavigate()
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
        <div className='sticky top-2 mb-4'>
            <form className='relative h-8 flex' onSubmit={(e) => { e.preventDefault() }} >
                <input className='w-full bg-[--boxColor] border-none rounded-my-rounded-10px' type='text' placeholder='search more' value={searchData} onChange={(e) => { e.preventDefault(); setSearechData(e.target.value) }}></input>
                <img onClick={searchDataApi} className='absolute top-[10%] right-1 w-6 h-6'
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    src={mouseOver ? sreachPitchIcon : sreachIcon} alt="搜索" />
            </form>
        </div>

    )
}
