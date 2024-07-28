import React from 'react'
import MainMenuTitle from './MainMenuTitle'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

export default function MainMenuLink({ to, src, text, children }) {

    return (
        <Link to={to} className={'lg:flex lg:flex-row lg:items-center lg:mb-5' }>
            <div className='w-10 h-10 rounded-full max-lg:m-0 lg:mr-10 '>
                <img className=' w-10 h-10 ' src={src} ></img>
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
    // className: PropTypes.string,
}
