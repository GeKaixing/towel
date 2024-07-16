import React, { useState } from 'react'
import style from './Signup.module.css'
import { postRegister } from '../../../services/Signup/signup'
import { getNodemailerRegister } from '../../../services/nodemailerRegister/nodemailerRegister'
export default function Signup() {
  const [valuename_signup, setValuename_signup] = useState('') // 获取账号
  const [valuepassword_signup, setValuepassword_signup] = useState('')  // 获取密码
  const [inputEmailData, setInputEmailData] = useState('')  // 获取邮箱
  const [verificationcode, setVerificationCode] = useState('')  // 获取验证码
  // 后端返回的设置注册状态
  const signupstate = true
  const [isEmail, setEmail] = useState(false)
  const signupApi = async () => {
    if (isEmail && valuename_signup && valuepassword_signup && verificationcode) {
      postRegister({
        data: {
          username: valuename_signup,
          password: valuepassword_signup,
          email: inputEmailData,
          code: verificationcode
        }
      })
        .then((response) => {
          if (response.data.status) {
            window.location.href = '/login'
          } else {
            alert('注册失败')
          }
        })
        .catch((error) => console.log(error))
    } else {
      alert('别空着')
    }
  }
  function validateEmail(e) {
    e.preventDefault();
    setInputEmailData(e.target.value)
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    setEmail(() => emailPattern.test(inputEmailData))
  }
  const sendEmailRegister = () => {
    if (isEmail && valuename_signup && valuepassword_signup) {
      getNodemailerRegister({
        data: {
          username: valuename_signup,
          password: valuepassword_signup,
          email: inputEmailData
        }
      }).then(res => {
        if (res.data.code === 201) {
          alert('验证码已发送')
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      alert('别空着')
    }
  }
  return (
    <div className='flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col space-y-2'>
      {/* 注册页面 */}
      <div className='w-10 h-10'>
        {/* global process*/}
        <img src={process.env.PUBLIC_URL + '/logo.png'} ></img>
      </div>
      <input className={style.name} type='text' value={valuename_signup} onChange={(e) => { e.preventDefault(); setValuename_signup(e.target.value) }} placeholder='账号'>
      </input>
      <input type='password' className={style.password} value={valuepassword_signup} onChange={(e) => { e.preventDefault(); setValuepassword_signup(e.target.value) }} placeholder='密码'>
      </input>
      <input type='email' className={style.password} value={inputEmailData} onChange={validateEmail} placeholder='电子邮件发送验证码'>
      </input>
      {isEmail ?
        <>
          <input type='text' className={style.password} value={verificationcode} onChange={(e) => { e.preventDefault(); setVerificationCode(e.target.value) }} placeholder='验证码'>
          </input>
          <button className={style.button} onClick={sendEmailRegister}>
            发送验证码
          </button>
        </>
        : null}
      <button onClick={signupApi} className={style.button}>
        注册
      </button>
      {signupstate ? null : <div>账号重复</div>}
    </div >
  )
}
