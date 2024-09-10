import React, { useEffect, useState } from 'react'
import { getToutiaoHot } from '../../../services/toutiaohot/toutiaohot'
import { Link } from 'react-router-dom'

export default function ToutiaoHot() {
    const [resData, setResData] = useState([])
    const [sliceData,setSliceData]=useState([])
    
    useEffect(() => {
        getToutiaoHot().then(res => {
            setResData(res.data)
            setSliceData( res.data.data.slice(1,5))
        }).catch(e => { console.log(e) })
    }, [])
    return (
        <div className='flex flex-col space-x-2 bg-[--boxColor] w-full rounded-my-rounded-10px p-2'>
            <div className='self-center mb-2'>今日头条</div>
            {
                resData.success &&
                sliceData.map((item, index) => (
                    <Link to={item.url} key={index} target="_blank" rel="noopener noreferrer">
                        <div className='font-semibold text-nowrap text-ellipsis overflow-hidden hover:bg-[--boxHoverColor] hover:rounded-[10px]'>
                            {item.title}
                        </div>
                        <div className='text-gray-500'>
                            {item.hot_value}
                        </div>
                    </Link>
                ))
            }

        </div>
    )
}
