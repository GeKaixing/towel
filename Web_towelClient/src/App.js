import React, { createContext, useEffect, useState } from 'react'
import Routers from './router/Routers'
import { searchDatauseContext } from './context/searchData'
import { noReadNumbers } from './context/noReadNumbers'
import { initSocket } from './socket/socket'
export const MessageResponseDataContext = createContext(null)
export const selectLightorDarkContext = createContext(null)
export default function App(){
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
    const [colorModel, setColorModel] = useState(false)
    useEffect(() => {
        const body = document.body;
        const colorModeldata = localStorage.getItem('color-model');
        if (colorModeldata === 'system') {
            const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            colorSchemeQuery.addEventListener('change', (event) => {
                if (event.matches) {
                    body.setAttribute('color-model', 'dark');
                } else {
                    body.setAttribute('color-model', 'light');
                }
            })

        } else {
            switch (colorModeldata) {
                case 'light':
                    body.setAttribute('color-model', `light`);
                    break;
                case 'dark':
                    body.setAttribute('color-model', `dark`);
                    break;
                case 'bing':
                    body.setAttribute('color-model', `bing`);
                    var bgi = document.getElementById('bgi')
                    bgi.style.backgroundImage = `url(${localStorage.getItem('backgroundimg')})`
                    bgi.style.backgroundSize = 'cover';
                    bgi.style.backgroundPosition = 'center';
                    bgi.style.zIndex = '-1';
                    bgi.style.position = 'absolute';
                    bgi.style.top = '0';
                    bgi.style.left = '0';
                    bgi.style.height = '100vh';
                    bgi.style.width = '100%';
                    bgi.style.margin = '0';
                    break;
                case 'system':
                    var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)').matches;//ture 现在系统处于深色模式
                    colorSchemeQuery ? body.setAttribute('color-model', `dark`) : body.setAttribute('color-model', `light`);
                    break;
                default:
                    body.setAttribute('color-model', `light`);
                    break;
            }
        }

    }, [colorModel, window])
    return (
        <searchDatauseContext.Provider value={{ searchData, setsearchData }}>
            <noReadNumbers.Provider value={{ noReadNumber, setNoReadNumber }}>
                <MessageResponseDataContext.Provider value={{ MessageResponseData, setMessageResponseData }}>
                    <selectLightorDarkContext.Provider value={{ colorModel, setColorModel }}>
                        <Routers />
                    </selectLightorDarkContext.Provider>
                </MessageResponseDataContext.Provider>
            </noReadNumbers.Provider>
        </searchDatauseContext.Provider>

    )
}
