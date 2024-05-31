import React from 'react'
import './ErrorPopup.css'
const ErrorPopup = ({Error}) => {
    console.log(Error)
  return (
    <div className='ErrorPopup-container'>{Error}</div>
  )
}

export default ErrorPopup