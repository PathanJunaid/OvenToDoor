import { StrictMode, useContext, useEffect } from 'react'
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
const AdminRoutes = () => {
    const { AdminAuthenticated, fetchadminorders, fetchadminMenu, ShowloginModel, responsemsg, setsocketId, setnotification } = useContext(AdminStoreContext);

    useEffect(() => {
        socket.on('connection', (socket) => {
            setsocketId(socket);
        })
        socket.on('connect', () => {
            console.log('Received message:');
        });
        socket.on('previous_Notification', (Nt) => {
            // console.log(Nt);
            setnotification([...Nt]);

        })
        fetchadminorders();
        fetchadminMenu();
    }, [AdminAuthenticated, setnotification, setsocketId])
    return (
        <>
            {
                ShowloginModel ? <AdminLogin /> : ""
            }
            {
                responsemsg !== "" ? <ErrorPopup /> : ""
            }
            <div className='app'>
                <StrictMode>
                    <Admin_Navbar />
                    <Routes>
                        <Route path='/' element={<Admin />} />
                        <Route path='/order' element={<AdminOrder />} />
                        <Route path='/notifications' element={<NotificationPage />} />
                        <Route path="/notification/:id" element={<NotificationDetail />} />
                        <Route path='/Menuform' element={<AdminMenuForm />} />
                        <Route path='/Menuform/Edit/:_id' element={<AdminDishEdit />} />
                    </Routes>

                </StrictMode>
            </div>
        </>
    )
}

export default AdminRoutes