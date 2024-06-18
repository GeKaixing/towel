import React, { createContext, useEffect, useState } from 'react'
import Routers from './router/Routers'
import { searchDatauseContext } from './context/searchData'
import { noReadNumbers } from './context/noReadNumbers'
import { initSocket } from './socket/socket'
export const MessageResponseDataContext = createContext(null)
export default function App() {
    const [searchData, setsearchData] = useState([]);
    const [noReadNumber, setNoReadNumber] = useState('')
    const [MessageResponseData, setMessageResponseData] = useState([])
    useEffect(() => {
        if (localStorage.getItem('loginData')) {
            const localStorageDatas = JSON.parse(localStorage.getItem('loginData'));
            let socket = initSocket(localStorageDatas.userid)
            socket.on(`${localStorageDatas.userid}`, (data) => {
                setMessageResponseData(data.datas)
            });
        }
    }, [])
    return (
        <searchDatauseContext.Provider value={{ searchData, setsearchData }}>
            <noReadNumbers.Provider value={{ noReadNumber, setNoReadNumber }}>
                <MessageResponseDataContext.Provider value={{ MessageResponseData, setMessageResponseData }}>
                    <Routers />
                </MessageResponseDataContext.Provider>
            </noReadNumbers.Provider>
        </searchDatauseContext.Provider>

    )
}
