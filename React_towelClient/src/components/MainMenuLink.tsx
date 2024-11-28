import React from 'react'
import MainMenuTitle from './MainMenuTitle'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function MainMenuLink({ to, src, text, children, className, target = '_self' }) {

    return (
        <Link to={to} target={target} className={`
        ${className} lg:flex lg:flex-row lg:items-center lg:mb-5  hover:rounded-[10px]
        relative
        
        `
        }>
            <div className=' hover:bg-[--boxColor] w-10 h-10 rounded-full max-lg:m-0  lg:mr-20 flex justify-center items-center '>
                <img className=' w-10 h-10 max-md:w-[26px] max-md:h-[26px]' src={src} ></img>
            </div>
            < MainMenuTitle text={text}></MainMenuTitle>
            {children}
        </Link>
    )
}
MainMenuLink.propTypes = {
    text: PropTypes.string,
    to: PropTypes.string.isRequired,
    src: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
}
