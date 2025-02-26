import React from 'react'
import PropTypes from 'prop-types';
export default function MainMenuTitle({text}) {
  return (
    <div className=' max-lg:hidden lg:block text-[--fontColor] text-lg font-bold text-lfet absolute left-20	w-auto text-nowrap 
    '>{text}</div>
)
}
MainMenuTitle.propTypes={
  text:PropTypes.string
}