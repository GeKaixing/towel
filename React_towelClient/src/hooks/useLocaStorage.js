import { useState, useEffect } from 'react';
/**
 * @description read or set the localStorage function
 * @param() useLocalStorage
 * @returns(object,func)
 * @typedef(object,func) 
 * @property(object) object:{headimg,jwt,userid，username} 
 * @property(func)  set localStorage function
 * @example 
 * import useLocalStorage from 'example/useLocalStorage'
 * const [localStorageData, setLocalStorage] = useLocalStorage();
 * localStorageData.jwt
 * setLocalStorage({headimg,jwt,userid，username})
 * 
 */
export default function useLocalStorage() {
    const [localStorageData, setLocalStorageData] = useState(() => {
        const savedData = localStorage.getItem('loginData');
        return savedData ? JSON.parse(savedData) : {};
    });

    useEffect(() => { 
        const handleStorageChange = () => {
            const savedData = localStorage.getItem('loginData');
            setLocalStorageData(savedData ? JSON.parse(savedData) : {});
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const setLocalStorage = (data) => {
        localStorage.setItem('loginData', JSON.stringify(data));
        setLocalStorageData(data);
    };

    return [localStorageData, setLocalStorage];
}
