import React, { useMemo, useState } from 'react'
import { getToutiaoHot } from '../services/toutiaohot/toutiaohot'
import type { resData } from '../view/foot/toutiaohot/ToutiaoHot'
import { Link } from 'react-router-dom'
import { useLanguage } from '../store/LanguageContext';
import Follow from '../view/foot/follow/Follow';

export default function Search() {
    const { t } = useLanguage();
    const [sliceData, setSliceData] = useState<resData[]>([]);
    getToutiaoHot().then(res => {
        setSliceData(res.data.data.slice(1, 5))
    }).catch((e) => { console.log(e) })
    return (
        <div className='w-full p-2'>
            <div className='self-center mb-2 text-[--fontColor] '>{t('hotHews')}</div>
            {sliceData.map((item, index) => (
                <Link to={item.url} key={index} target="_blank" rel="noopener noreferrer" >
                    <div className='font-semibold text-[--fontColor] text-nowrap text-ellipsis overflow-hidden hover:bg-[--boxHoverColor] hover:rounded-[10px] p-2'>
                        {item.title}
                        <div className='text-gray-500'>
                            {item.hot_value}
                        </div>
                    </div>

                </Link>
            ))}
            <Follow></Follow>
        </div>
    )
}
