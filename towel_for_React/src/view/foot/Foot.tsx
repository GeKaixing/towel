import React from 'react'

import ToutiaoHot from './toutiaohot/ToutiaoHot';
import LInks from './links/LInks';
import Follow from './follow/Follow';
import User from './user/User';
import useLocaStorage from '../../hooks/useLocaStorage'
import Search from './search/Search';
export default function Foot() {
    // 解构login的state
    const [localStorageData] = useLocaStorage()
    return (
        <div className='w-[20%] mr-[10%] max-lg:hidden space-y-2'>
            <Search></Search>
            {localStorageData.jwt &&<User></User>}
            <Follow></Follow>
            <ToutiaoHot></ToutiaoHot>
            <LInks></LInks>
        </div>

    )
}
