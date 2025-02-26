import { createContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const conctexts = createContext(null)
export const dispatchs = createContext(null)
export function Providers({ children }) {
    const [data, dispatch] = useReducer(ReducerHandler, initial)
    return (
        <conctexts.Provider value={data}>
            <dispatchs.Provider value={dispatch}>
                {children}
            </dispatchs.Provider>
        </conctexts.Provider>
    )
}
const initial = {
    userData: {},
    account: 'test',
    password: '',
    isLogin: false,
}
function ReducerHandler(init, action) {
    switch (action.type) {
        case 'setiInitUserData':
            return {
                ...init,
                userData:action.payload
            }
        case 'setiInitIsLogin':
            return {
                ...initial,
                isLogin: action.payload
            }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
export async function setiInitUserData(dispatch) {
    try {
        const userData = await AsyncStorage.removeItem('userData');
        dispatch({ type: 'setiInitUserData', payload: userData })
    } catch (e) {
        console.log(e)
    }
}