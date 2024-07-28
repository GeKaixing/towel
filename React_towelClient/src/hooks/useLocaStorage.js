import { useState, useEffect } from 'react';

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
