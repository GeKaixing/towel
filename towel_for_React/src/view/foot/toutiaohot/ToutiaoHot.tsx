import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../store/LanguageContext';
export interface resData {
    success?: boolean;
    url: string;
    title: string;
    hot_value: string;
}
export default function ToutiaoHot() {
    const { t } = useLanguage();
    const [sliceData, setSliceData] = useState<resData[]>([])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                fetch('https://dabenshi.cn/other/api/hot.php?type=toutiaoHot')
                    .then(response => response.json())
                    .then(data => {
                        setSliceData(data.data.slice(1, 5))
                    })
                    .catch(e => { console.log(e) })
            }
        }
        handleResize()
        window.addEventListener("resize", () => {
            handleResize()
        })
    }, [])
    return (
        <div className='flex flex-col space-x-2 bg-[--boxColor] w-full rounded-my-rounded-10px p-2'>
            <div className='self-center mb-2 text-[--fontColor] '>{t('hotHews')}</div>
            {

                sliceData.map((item, index) => (
                    <Link to={item.url} key={index} target="_blank" rel="noopener noreferrer" >
                        <div className='font-semibold text-[--fontColor] text-nowrap text-ellipsis overflow-hidden hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'>
                            {item.title}
                            <div className='text-gray-500 '>
                                {item.hot_value}
                            </div>
                        </div>

                    </Link>
                ))
            }
        </div>
    )
}
