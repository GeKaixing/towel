import { createContext, useState,useEffect } from "react";
import * as React from 'react';
// 定义 context 的类型
interface SelectLightorDarkContextType {
    colorModel: boolean;
    setColorModel: React.Dispatch<React.SetStateAction<boolean>>;
}

// 使用默认对象初始化 context
export const selectLightorDarkContext = createContext<SelectLightorDarkContextType>({
    colorModel: false,
    setColorModel: () => {}
});
export const SelectLightorDarkProvider = ({ children }) => {

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
            if (colorSchemeQuery.matches) {
                body.setAttribute('color-model', 'dark');

            } else {
                body.setAttribute('color-model', 'light');
            }   
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
                    if(!bgi)break;
                    bgi.style.backgroundImage = `url(${localStorage.getItem('backgroundimg')})`
                    bgi.style.backgroundSize = 'cover';
                    bgi.style.backgroundPosition = 'center';
                    bgi.style.zIndex = '-1';
                    bgi.style.position = 'fixed';
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
        <selectLightorDarkContext.Provider value={{colorModel, setColorModel}}>
            {children}
        </selectLightorDarkContext.Provider>
    )
}
export const useSelectLightorDark = () => React.useContext(selectLightorDarkContext)
