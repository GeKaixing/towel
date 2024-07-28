import React  from 'react'
import { Routes, Route, } from 'react-router-dom'
// import style from "./Routers.module.css"
import MainMenu from '../view/head/MainMenu'
import About from '../view/body/aboutComponents/About'
import Post from '../view/body/postComponents/PostPage'
import Login from '../view/body/userComponents/Login'
import Signup from '../view/body/userComponents/Signup'
import UserHomePage from '../view/body/userComponents/userHomePageComponts/UserContent'
import Message from '../view/body/messageComponents/MessageConten'
import User from '../view/foot/User'
import Protected from './Protected'
import PostContent from '../view/body/postComponents/postContent/PostContent'
import Add from '../view/body/addComponents/AddContent'
import Search from '../components/Search'
import Setting from '../view/body/settingComponents/SettingContent'
import SettingUserForgetPage from '../view/body/settingComponents/SettingUserPage/SettingUserForgetPage'
import SettingBackgroundImg from '../view/body/settingComponents/SettingBackgroundPage/SettingBackgroundImg'
import SettingDeactivate from '../view/body/settingComponents/SettingUserPage/SettingDeactivate'
import SettingAccount from '../view/body/settingComponents/SettingUserPage/SettingAccount'
import NotRouter from '../components/NotRouter'
// import useLocalStorage from '../hooks/useLocaStorage'
import H5header from '../components/H5header'
export default function Routers() {
    return (
        <div className='flex '>
            <MainMenu></MainMenu>
            {/* 先不动，到了一点的宽度再动 */}
            <div className='max-lg:w-full lg:w-[40%] lg:ml-[30%] md:ml-20'>
                {/* h5Header  */}
               <H5header></H5header>
                <Routes>
                    <Route path='/' element={<Post></Post>}></Route>
                    <Route element={<Protected />}>
                        <Route path="/about" element={<About />}></Route>
                        <Route path='/Message' element={<Message />}></Route>
                        <Route path='/userhomepage/:id' element={<UserHomePage></UserHomePage>}></Route>
                        <Route path='/post' element={<Add></Add>}></Route>
                    </Route>
                    <Route path='/setting' element={<Setting />}>
                    </Route>
                    <Route path='/setting/backgroundimg' element={<SettingBackgroundImg />}> </Route>
                    <Route path='/setting/forget' element={<SettingUserForgetPage />}> </Route>
                    <Route path='/setting/deactivate' element={<SettingDeactivate />}> </Route>
                    <Route path='/setting/account' element={<SettingAccount />}> </Route>
                    <Route path='/search' element={<Search />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/postcontent/:id' element={<PostContent ></PostContent>}></Route>
                    <Route path="*" element={<NotRouter />}></Route>
                </Routes>

            </div>
            <User></User>
        </div >

    )
}
