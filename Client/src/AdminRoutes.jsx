import React, { StrictMode, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import Navbar from './components/Navbar/Navbar'
import Admin from './AdminPages/Admin'
import { AdminStoreContext } from './context/AdminStoreContextProvider'
import axios from 'axios'
import { AdminOrder } from './AdminPages/AdminOrder'
import Admin_Navbar from './AdminComponent/Navbar/Admin_Navbar'
import ErrorPopup from './AdminComponent/ErrorPopup/ErrorPopup'
import socket from './Socket/Socket'
const AdminRoutes = () => {
    const { AdminAuthenticated, setAdminAuthenticated, setOrders, ShowloginModel,setShowloginModel,responsemsg } = useContext(AdminStoreContext);
    const fetchadminorders = async () => {
        try {
            const response = await axios.post("http://localhost:4000/Admin/orders", {}, { withCredentials: true }).then((res) => {
                return res.data;
            }).catch((e) => {
                console.log(e)
            });
            if (response.auth) {
                setAdminAuthenticated(true);
                setShowloginModel(false)
                setOrders(response.data);
            }

        } catch (e) {

        }
    }
    useEffect(() => {
        socket.on('connecntion', (socket) => {
            console.log(socket.id);
        });
        socket.emit('connection')
        fetchadminorders();
    }, [AdminAuthenticated])
    return (
        <>
            {
                ShowloginModel ? <AdminLogin /> : ""
            }
            {
                responsemsg !== "" ? <ErrorPopup Error = {responsemsg}/> : ""
            }
            <div className='app'>
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