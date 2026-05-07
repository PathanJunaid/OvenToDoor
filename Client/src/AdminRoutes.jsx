import React, { StrictMode, useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import Admin from './AdminPages/Admin'
import { AdminStoreContext } from './context/AdminStoreContextProvider'
import { AdminOrder } from './AdminPages/AdminOrder'
import Admin_Navbar from './AdminComponent/Navbar/Admin_Navbar'
import ErrorPopup from './AdminComponent/ErrorPopup/ErrorPopup'
import { socket } from './Socket/Socket'
import NotificationPage from './AdminPages/NotificationPage'
import NotificationDetail from './AdminComponent/SpecificNotification/NotificationDetail';
import AdminMenuForm from './AdminPages/AdminMenuForm';
import AdminDishEdit from './AdminPages/AdminDishEdit'
import AdminSpecificOrderPage from './AdminPages/AdminSpecificOrderPage'
import Spinner from './components/Spinner/Spinner';
import Footer from "./components/Footer/Footer"
import ForgetPassPopup from './components/ForgetPassPopup/ForgetPassPopup'
const AdminRoutes = () => {
    const { AdminAuthenticated, fetchadminorders, fetchadminMenu, ShowloginModel, responsemsg, setsocketId, setnotification,setAdminforgetPass,AdminforgetPass } = useContext(AdminStoreContext);
    const [LoadData, setLoadData] = useState(true)
    useEffect(() => {
        const data = async () => {
            setLoadData(true)
            await fetchadminorders();
            await fetchadminMenu();
            setLoadData(false)
        }
        data();
    }, [])
    useEffect(() => {
        socket.on('connection', (socket) => {
            setsocketId(socket);
        })
        socket.on('connect', () => {
            console.log('Received message:');
        });
        socket.on('previous_Notification', (Nt) => {
            setnotification([...Nt]);
        })

    }, [AdminAuthenticated, setnotification, setsocketId])
    return (

        <>
            {
                ShowloginModel ? <AdminLogin /> : ""
            }
            {
                responsemsg !== "" ? <ErrorPopup /> : ""
            }
            { AdminforgetPass ? <ForgetPassPopup setforgetPassword={setAdminforgetPass} forgetPassword={AdminforgetPass} /> : <></>}

            <Admin_Navbar />
            {
                LoadData ? <Spinner /> :
                    <div className='admin-app container'>
                        <StrictMode>
                            <Routes>
                                <Route path='/' element={<Admin />} />
                                <Route path='/order' element={<AdminOrder />} />
                                <Route path='/order/:_id' element={<AdminSpecificOrderPage />} />
                                <Route path='/notifications' element={<NotificationPage />} />
                                <Route path="/notification/:id" element={<NotificationDetail />} />
                                <Route path='/Menuform' element={<AdminMenuForm />} />
                                <Route path='/Menuform/Edit/:_id' element={<AdminDishEdit />} />
                            </Routes>

                        </StrictMode>
                    </div>
            }
            <Footer />
        </>
    )
}

export default AdminRoutes