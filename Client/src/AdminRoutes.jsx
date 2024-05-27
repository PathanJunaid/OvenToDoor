import React, { StrictMode, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import Navbar from './components/Navbar/Navbar'
import Admin from './AdminPages/Admin'
import { AdminStoreContext } from './context/AdminStoreContextProvider'

const AdminRoutes = () => {
    const { AdminAuthenticated } = useContext(AdminStoreContext);
    return (
        <>
            <div>
                <StrictMode>
                    {/* <Navbar/> */}
                    <Routes>
                        {!AdminAuthenticated && (
                            <Route path='/' element={<AdminLogin />} />
                        )}
                        {AdminAuthenticated && (
                            <Route path='/' element={<Admin />} />
                        )}
                    </Routes>

                </StrictMode>
            </div>
        </>
    )
}

export default AdminRoutes