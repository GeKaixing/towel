import React from 'react'
import PropTypes from 'prop-types';
export default function MainMenuComponents({text}) {
  return (
    <div className='text-xl font-bold max-md:hidden'>{text}</div>
)
}
MainMenuComponents.propTypes={
  text:PropTypes.string
}