import React, { StrictMode, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import Navbar from './components/Navbar/Navbar'
import Admin from './AdminPages/Admin'
import { AdminStoreContext } from './context/AdminStoreContextProvider'
import axios from 'axios'
import { AdminOrder } from './AdminPages/AdminOrder'
import Admin_Navbar from './AdminComponent/Navbar/Admin_Navbar'

const AdminRoutes = () => {
    const { AdminAuthenticated, setAdminAuthenticated, setOrders, ShowloginModel } = useContext(AdminStoreContext);
    const fetchadminorders = async () => {
        try {
            const response = await axios.post("http://localhost:4000/Admin/orders", {}, { withCredentials: true }).then((res) => {
                return res.data;
            }).catch((e) => {
                console.log(e)
            });
            if (response.auth) {
                setAdminAuthenticated(true);
                setOrders(response.data);
            }

        } catch (e) {

        }
    }
    useEffect(() => {
        fetchadminorders();
    }, [AdminAuthenticated])
    return (
        <>
            {
                ShowloginModel ? <AdminLogin /> : ""
            }
            <div>
                <StrictMode>
                    <Admin_Navbar />
                    <Routes>
                        <Route path='/' element={<Admin />} />
                        <Route path='/order' element={<AdminOrder />} />

                    </Routes>

                </StrictMode>
            </div>
        </>
    )
}

export default AdminRoutes