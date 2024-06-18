import { configureStore } from '@reduxjs/toolkit'
import LoginSignupReducer from '../components/UserLoginSignupComponents/LoginSignupStore/LoginSignupSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer: {
        LoginSignupReducer,
    }
})
setupListeners(store.dispatch)