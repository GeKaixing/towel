import React from 'react';
import leftIcon from '../assets/static/otherIcon/左_left.svg'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router';


export default function Backtab({text,href='/'}) {
    const navigate=useNavigate()
    const hrefHandle=()=>{
        navigate(href)
    }
  return (
    <div className="flex w-full items-center space-x-2  max-md:hidden mb-2 sticky top-0 bg-[--backgroundcolor]">
      <button
        className="w-10 h-10 bg-[--boxColor] hover:bg-[--boxHoverColor]  rounded-full  flex justify-center items-center"
        onClick={hrefHandle}
      >
        <img src={leftIcon}></img>
      </button>
      <div className="font-bold text-xl text-[--fontColor]">{text}</div>
    </div>
  );
}
Backtab.propTypes={
    text:propTypes.string,
    href:propTypes.string,
}
