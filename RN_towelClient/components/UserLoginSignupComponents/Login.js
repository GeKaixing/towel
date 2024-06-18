import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAccount, getPassword, isLoginHandler } from './LoginSignupStore/LoginSignupSlice'
import axios from '../../axios/axios'
import { useNavigation } from '@react-navigation/native';
import { dispatchs, setiInitUserData } from '../../context/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../../storage/storage'
export default function Login() {
    const dispatch = useContext(dispatchs)
    const [accountOrPassword, setAccountOrPassword] = useState({
        account: '',
        password: ''
    })
    const [isAccountOrpasswordError, setIsAccountOrpasswordError] = useState(false)
    const navigation = useNavigation();
    const axiosLoginApi = () => {
        setIsAccountOrpasswordError(false)
        axios({
            method: 'post',
            url: "login",
            data: {
                data: {
                    username: accountOrPassword.account,
                    password: accountOrPassword.password
                }
            }
        }).then((data) => {
            if (data.data) {
                storage.save({
                    key: 'loginState', // 注意:请不要在key中使用_下划线符号!
                    data: data.data,
                });
                dispatch({ type: 'setiInitIsLogin', payload: true })
                storage.load({
                    key: 'loginState',
                    autoSync: true,
                    syncInBackground: true,
                })
                    .then(ret => {
                        dispatch({ type: 'setiInitUserData', payload: ret })
                    })
                    .catch(err => {
                        dispatch({ type: 'setiInitUserData', payload: {} })
                    });

                navigation.goBack()
            } else {
                setIsAccountOrpasswordError(true)
            }
        }).catch(() => {
            setIsAccountOrpasswordError(true)
        })
    }
    /* 
    * 登录函数
    */
    const loginHandler = () => {
        (accountOrPassword.account && accountOrPassword.password) ? axiosLoginApi() : setIsAccountOrpasswordError(true);
    }
    return (
        <View style={styles.login}>
            <View style={styles.account}>
                <Text>account</Text>
                <TextInput
                    onChangeText={text => setAccountOrPassword({ ...accountOrPassword, account: text })}
                    style={styles.accountInput}
                    value={accountOrPassword.account}
                ></TextInput>
            </View>
            <View style={styles.password}>
                <Text>password</Text>
                <TextInput
                    onChangeText={text => setAccountOrPassword({ ...accountOrPassword, password: text })}
                    style={styles.passwordInput}
                    value={accountOrPassword.password}
                ></TextInput>
            </View>
            {
                isAccountOrpasswordError ? <Text>账号或者密码错误</Text> : null
            }
            <Button
                title='登录'
                style={styles.loginButton}
                onPress={loginHandler}
            >
            </Button>
            <Pressable
                style={styles.signup}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text >注册</Text>
            </Pressable>
            <View style={styles.forgetPassword}>
                <Text>忘记密码</Text>
            </View>
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
    signup: {
        width: 60,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        width: 60,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgetPassword: {
        width: 60,
        borderRadius: 10,
        height: 40,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})