'use client'
import React from 'react'

export default function MoreButton({...props}) {
  return (
    <div {...props} onClickCapture={(event) => {
      event.stopPropagation();
      event.preventDefault();
      console.log('more');
    }}>
      ...
    </div>
  )
}