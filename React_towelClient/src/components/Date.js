
  import React from 'react'
  import PropTypes from 'prop-types'
  
  function Date({children}) {
    return (
        <div className='text-sm text-[--boxHoverColor]'>{children}</div>
    )
  }
  Date.propTypes = {
    children: PropTypes.node.isRequired,
  }
  
  export default Date
  