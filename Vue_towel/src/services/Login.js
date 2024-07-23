import {http} from './config'
export const login = (username, password) => http.post('login', {data:{username, password}})