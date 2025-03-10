import { open } from '../config';
//注册
export const postRegister=(data)=>{
    return open({ url: 'register',data,method:'post' })
}