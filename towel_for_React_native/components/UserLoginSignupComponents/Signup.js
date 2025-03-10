import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import axios from '../../axios/axios'

export default function Signup() {
  /* 
  * 只用正则表达式检测是不是邮箱格式
  */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  function isEmail(email) {
    return emailRegex.test(email);
  }
  const [emailInput, setEmailInput] = useState('')
  const [accountInput, setAccountInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [isCodeInput, setIsCodeInput] = useState(false)
  const [isempty, setIsEmpty] = useState(false)

  const nodemailerRegisterAPi = () => {
    axios.post('nodemailerRegister', {
      data: {
        username: accountInput,
        password: passwordInput,
        email: emailInput
      }
    })
      .then(function (response) {
        if (response.data.message === '您的验证码已经到达邮件,注意5分钟后过期') {
          setIsCodeInput(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const signupAPi = () => {
    axios.post('register', {
      data: {
        username: accountInput,
        password: passwordInput,
        email: emailInput,
        code: codeInput
      }
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const nodemailerRegisterHandler = () => {
    (isEmail(emailInput) && accountInput && passwordInput) ? nodemailerRegisterAPi() : setIsEmpty(true)
  }
  const signuHandler = () => {
    (isEmail(emailInput) && accountInput && passwordInput && (code!=='')) ? signupAPi() : setIsEmpty(true)
  }
  return (
    <View style={styles.login}>
      <View style={styles.account}>
        <Text>account</Text>
        <TextInput style={styles.accountInput}
          onChangeText={(text) => { setAccountInput(text) }}
          value={accountInput}
        ></TextInput>
      </View>
      <View style={styles.password}>
        <Text>password</Text>
        <TextInput style={styles.passwordInput}
          onChangeText={(text) => { setPasswordInput(text) }}
          value={passwordInput}
        ></TextInput>
      </View>
      <View style={styles.email}>
        <Text>email</Text>
        <TextInput style={styles.emailInput}
          onChangeText={(text) => { setEmailInput(text) }}
          value={emailInput}
        ></TextInput>
      </View>
      {isCodeInput ? <View style={styles.code}>
        <Text>code</Text>
        <TextInput style={styles.codeInput}
          onChangeText={(text) => { setCodeInput(text) }}
          value={codeInput}
        ></TextInput>
      </View> : null}
      {isempty ? <Text>其中一项为空</Text> : null}
      <Pressable style={styles.signup} onPress={nodemailerRegisterHandler}>
        <Text>发送验证码</Text>
      </Pressable>
      <Pressable style={styles.signup} onPress={signuHandler}>
        <Text>注册</Text>
      </Pressable>

    </View>
  )
}
const styles = StyleSheet.create({
  login: {
    width: '90%',
    display: 'flex',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  account: {
    width: '100%',
  },
  accountInput: {
    width: '100%',
    height: 30,
    backgroundColor: 'gray',
  },
  password: {
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    height: 30,
    backgroundColor: 'gray',
  },
  email: {
    width: '100%',
    height: 30,
    backgroundColor: 'gray'
  },
  email: {
    width: '100%',
  },
  emailInput: {
    width: '100%',
    height: 30,
    backgroundColor: 'gray'
  },
  code: {
    width: '100%',
  },
  codeInput: {
    width: '100%',
    height: 30,
    backgroundColor: 'gray'
  },
  signup: {
    width: 60,
    borderRadius: 10,
    height: 40,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})