import { open } from '../config';
//登录
export const postLogin=(data)=> {
  return open({ url: 'login', data,method:'post'})
}