
  import React from 'react'
  import PropTypes from 'prop-types'
  import useDateFormat from '../hooks/useDateFormat'
  function Date({children, className}) {
    const date=useDateFormat(children)
    return (
        <div className={`text-sm text-[--boxHoverColor] flex flex-nowrap ${className}`}>{date}</div>
    )
  }
  Date.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }
  
  export default Date
  