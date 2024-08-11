import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Login.module.css'
import { postLogin } from '../../../services/login/login'
import eyeIconOpen from '../../../assets/static/otherIcon/预览打开.svg'
import eyeIconClose from '../../../assets/static/otherIcon/预览关闭.svg'
export default function Login() {
    // 设置账号init
    const [valuename, setValuename] = useState('')
    // 设置密码init
    const [valuepassword, setValuepassword] = useState('')
    // 是否显示密码
    const [showpassword, setshowpassword] = useState(false)

    const LoginApi = async () => {
        try {
            const reponseData = await postLogin({
                data: {
                    password: valuepassword,
                    username: valuename
                }
            })
            const data = JSON.stringify(reponseData.data)
            localStorage.setItem('loginData', data)
            setValuename('')
            setValuepassword('')
            window.location.href = '/';
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col space-y-2'>
            {/* 登录页面 */}
            {/* global process*/}
            <div className='w-10 h-10 '>
                <img src={process.env.PUBLIC_URL + '/logo.png'} ></img>
            </div>
            <form className='flex flex-col items-center space-y-2' onSubmit={(e) => { e.preventDefault(); LoginApi() }} >
                <input className={style.name} type={'text'} value={valuename} onChange={(e) => { setValuename(e.target.value) }} placeholder='名字' required />
                <div className={style.tip}>
                    <input className={style.password} type={showpassword ? 'text' : 'password'} autoComplete='off'
                        value={valuepassword} onChange={(e) => { setValuepassword(e.target.value) }} placeholder='密码' required></input>
                    {/* 显示密码的图标 */}
                    {showpassword ?
                        <img className={style.EyeOutlined} onClick={() => setshowpassword(!showpassword)} src={eyeIconOpen} alt="预览打开" />
                        :
                        <img className={style.EyeInvisibleOutlined} onClick={() => setshowpassword(!showpassword)} src={eyeIconClose} alt="预览关闭" />
                    }
                </div>
                <button className='font-bold w-[6.5rem] h-[1.5rem] bg-[--boxColor] hover:bg-[--boxColor] text-[--fontColor]' type='submit'>
                    登录
                </button>
                <Link className='font-bold w-[6.5rem] h-[1.5rem] bg-[--boxColor] hover:bg-[--boxColor] text-center text-[--fontColor]' to={"/signup"}>注册</Link>
                <Link className='font-bold w-[6.5rem] h-[1.5rem] bg-[--boxColor] hover:bg-[--boxColor] text-center text-[--fontColor]' to={"/setting"}>设置</Link>
            </form>

        </div>

    )
}