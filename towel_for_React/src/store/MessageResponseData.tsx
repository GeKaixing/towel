import { createContext, useContext } from "react";
import * as React from "react";

interface MessageResponseDataState {
    MessageResponseData: any[];
    setMessageResponseData: React.Dispatch<React.SetStateAction<any[]>>;
}

const defaultState: MessageResponseDataState = {
    MessageResponseData: [],
    setMessageResponseData: () => { }
};
export const MessageResponseDataContext = createContext<MessageResponseDataState>(defaultState);


export const MessageResponseDataProvider = ({ children }) => {
    const [MessageResponseData, setMessageResponseData] = React.useState<any[]>([])
    return <MessageResponseDataContext.Provider value={{ MessageResponseData, setMessageResponseData }}>
        {children}
    </MessageResponseDataContext.Provider>
}
export const useMessageResponseData = () => useContext(MessageResponseDataContext)