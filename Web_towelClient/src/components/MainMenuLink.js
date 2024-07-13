import React from 'react'
import MainMenuComponents from './MainMenuComponents'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

export default function MainMenuLink({ to, src, text,children,className }) {

    return (
        <Link to={to} className={['max-md:w-auto w-[150px] h-[50px] text-[20px] mt-[15px] text-[--fontColor] decoration-0 rounded-my-rounded-10px bg-[--boxColor] hover:bg-[--boxHoverColor]  flex justify-center items-center ',className]}>
            <img src={src} className={['w-8 h-8 rounded-full mr-2']}></img>
            < MainMenuComponents text={text}></MainMenuComponents>
            {children}
        </Link>
    )
}
MainMenuLink.propTypes = {
    text: PropTypes.string,
    to: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
}
