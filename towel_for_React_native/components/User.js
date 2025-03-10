import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PostContext from './postComponents/PostContext'
import Login from './UserLoginSignupComponents/Login'
import Signup from './UserLoginSignupComponents/Signup'
import Usercontent from './UserLoginSignupComponents/UserContent'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../storage/storage'
import { conctexts, dispatchs } from '../context/context'
export default function User() {
    const contexts = useContext(conctexts)
    return (
        (contexts.userData)? <Usercontent></Usercontent> : <Login></Login>
        /*   <Signup></Signup>  */
    )
}