import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    account: '',
    password: '',
    isLogin: false
}



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getAccount: (state, action) => {
            state.account = action.payload
        },
        getPassword: (state, action) => {
            state.password = action.payload
        },
        isLoginHandler: (state, action) => {
            state.isLogin = action.payload
        }
    }
})
export const { getAccount, getPassword, isLoginHandler } = loginSlice.actions
export default loginSlice.reducer