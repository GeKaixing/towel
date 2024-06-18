import React, { createContext, useState } from 'react'
import { Link, } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import style from './Login.module.css'
import axios from 'axios'
export default function Login() {
    // 设置账号init
    const [valuename, setValuename] = useState('')
    // 设置密码init
    const [valuepassword, setValuepassword] = useState('')
    // 是否显示密码
    const [showpassword, setshowpassword] = useState(false)
    // uselonginMutation Api
    const LoginApi = async () => {
        try {
            const reponseData = await axios({
                url: 'http://127.0.0.1:4000/login',
                method: 'post',
                data: {
                    data: {
                        password: valuepassword,
                        username: valuename
                    }
                }
            })
            console.log(reponseData.data)
            const data = JSON.stringify(reponseData.data)
            localStorage.setItem('loginData', data)
            setValuename('')
            setValuepassword('')
            window.location.href='/';
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={style.login}>
            {/* 登录页面 */}
            <div className={style.logo}>logo</div>
            <input className={style.name} type={'text'} value={valuename} onChange={(e) => { setValuename(e.target.value) }} placeholder='名字'>
            </input>
            <div className={style.tip}>
                <input className={style.password} type={showpassword ? 'text' : 'password'} value={valuepassword} onChange={(e) => { setValuepassword(e.target.value) }} placeholder='密码'></input>
                {/* 显示密码的图标 */}
                {showpassword ?
                    <EyeOutlined className={style.EyeOutlined}  onClick={()=>setshowpassword(!showpassword)}/> :
                    <EyeInvisibleOutlined className={style.EyeInvisibleOutlined}  onClick={()=>setshowpassword(!showpassword)}/>
                }
            </div>
            <button className={style.button} onClick={LoginApi}>
                登录
            </button>
            <Link className={style.signup} to={"/signup"}>注册</Link>
        </div>

    )
}