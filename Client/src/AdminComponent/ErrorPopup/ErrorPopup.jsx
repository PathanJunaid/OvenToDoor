import React, { useContext, useEffect } from 'react'
import './ErrorPopup.css'
import { AdminStoreContext } from '../../context/AdminStoreContextProvider'
const ErrorPopup = ({Error}) => {
  const {responsemsg,setresponsemsg} = useContext(AdminStoreContext);
  useEffect(()=>{
    setTimeout(() => {
      setresponsemsg("") 
    }, 3000);
  })
  return (
    <div className='ErrorPopup-container'>{responsemsg}</div>
  )
}

export default ErrorPopup