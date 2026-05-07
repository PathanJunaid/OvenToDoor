import React, { useContext } from 'react'
import AdminMenu from '../AdminComponent/AdminMenu/AdminMenu'
import { AdminStoreContext } from '../context/AdminStoreContextProvider'
const Admin = () => {
  const { AdminAuthenticated,setShowloginModel } = useContext(AdminStoreContext);
  return (
    <>
      {
        AdminAuthenticated ? "" :
          <div>
            <h5 className='mb-4'>
              Please login using your email and password.
            </h5>
            <button className='btn-all' onClick={()=>setShowloginModel(true)}>
              Login
            </button>
          </div>
      }
      <AdminMenu />
    </>
  )
}

export default Admin