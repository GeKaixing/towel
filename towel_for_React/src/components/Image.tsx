import React from 'react'
import PropTypes from 'prop-types'
function Image(props) {
    const errorHandler = (e) => {
      e.target.src='https://raw.githubusercontent.com/GeKaixing/towel/refs/heads/main/README_static/logo.png'
    }
  return (
    <img src={props.src} onError={errorHandler} className={props.className} />  
  )
}

Image.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
}

export default Image
