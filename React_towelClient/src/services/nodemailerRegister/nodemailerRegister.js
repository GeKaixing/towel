import { open } from '../config';
//发送电子邮件验证码
export const getNodemailerRegister=(data)=>{
    return open({url:'nodemailerRegister',data})
}