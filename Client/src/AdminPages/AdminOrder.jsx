import React, { useContext } from 'react'
import { AdminStoreContext } from '../context/AdminStoreContextProvider'

export const AdminOrder = () => {
    const {Orders,setOrders} = useContext(AdminStoreContext);
    console.log(Orders)
  return (
    <div>AdminOrder</div>
  )
}
