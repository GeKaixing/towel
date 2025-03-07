import React from 'react'
import { Button } from './button'

export default function TowelButton({...props}) {
  return (
   <Button {...props} className='hover:bg-assistantColor '/>
  )
}
