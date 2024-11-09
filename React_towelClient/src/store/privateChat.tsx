import { createContext, useState,useContext } from 'react';
import * as React from 'react';

interface PrivateChatContextType {
    privateChatData: any[];
    setPrivateChatData: React.Dispatch<React.SetStateAction<any[]>>;
}
export const privateChatContext = createContext<PrivateChatContextType|[]>([]);
export const PrivateChatProvider = ({ children }) => {
    const [privateChatData, setPrivateChatData] = useState<any[]>([]);

    return (
        <privateChatContext.Provider value={{privateChatData, setPrivateChatData }}>
            {children}
        </privateChatContext.Provider>
    );
};
export const usePrivateChatContext = () => useContext(privateChatContext);