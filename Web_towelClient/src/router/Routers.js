import React from 'react'
import { Routes, Route, } from 'react-router-dom'
import style from "./Routers.module.css"
import MainMenu from '../components/MainMenu'
import About from '../components/mainMenuComponents/About'
import Post from '../components/mainMenuComponents/Post'
import Login from '../components/mainMenuComponents/userComponents/Login'
import Signup from '../components/mainMenuComponents/userComponents/Signup'
import UserHomePage from '../components/mainMenuComponents/userComponents/userHomePageComponts/UserHomePage'
import Message from '../components/mainMenuComponents/Message'
import User from '../components/mainMenuComponents/User'
import Protected from './Protected'
import PostContent from '../components/mainMenuComponents/postComponents/postContent/PostContent'
import Add from '../components/mainMenuComponents/Add'
import Search from '../components/mainMenuComponents/Search'
export default function Routers() {
    return (
        <div className={style.layout}>
            <MainMenu ></MainMenu>
            <div style={{width:'648px',display:'flex',justifyContent:'center',}}>
                <Routes>
                    <Route path='/' element={<Post></Post>}></Route>
                    <Route element={<Protected />}>
                        <Route path="/about" element={<About />}></Route>
                        <Route path='/Message' element={<Message />}></Route>
                        <Route path='/userhomepage/:id' element={<UserHomePage></UserHomePage>}></Route>
                        <Route path='/post' element={<Add></Add>}></Route>
                    </Route>
                    <Route path='/search' element={<Search />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/homepage/:id' element={<PostContent ></PostContent>}></Route>
                </Routes>
            </div>
            <User></User>
        </div>

    )
}
