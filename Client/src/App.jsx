import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeholder from './pages/Placeholder/Placeholder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ForgetPassPopup from './components/ForgetPassPopup/ForgetPassPopup'
import { StoreContext } from './context/StoreContext'
import Specific_Order from './pages/SpecificOrder/Specific_Order'
import Spinner from './components/Spinner/Spinner'
import AddressPopup from './components/AddressPopup/AddressPopup'
import { AdminStoreContext } from './context/AdminStoreContextProvider'
import { socket } from './Socket/Socket'


const App = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false)
  const [forgetPassword, setforgetPassword] = useState(false)
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const { setresponsemsg, AdminforgetPass, setAdminforgetPass } = useContext(AdminStoreContext);
  const [wait, setWait] = useState(true);
  const { Authenticated, Loading, setLoading, fetchFood_List, fetchAddressdetails, fetchOrdersdetails, fetchcartitems } = useContext(StoreContext);
  useEffect(() => {
    socket.on("Refresh_Data_Client", async () => {
      await fetchOrdersdetails();
    })
    const fetchData = async () => {
      setLoading(true);
      await fetchFood_List();
      await fetchcartitems();
      await fetchOrdersdetails();
      await fetchAddressdetails();
      setLoading(false);
      setWait(false)
    };

    fetchData();
    try {
      const urlParams = new URLSearchParams(location.search);
      const msg = urlParams.get('msg');
      if (msg) {
        const decodedMsg = decodeURIComponent(msg);
        console.log(decodedMsg); // This will log your message
        setresponsemsg(decodedMsg);
      }
    } catch (e) {
      console.log("No msg", e)
    }
  }, [Authenticated, AdminforgetPass, setAdminforgetPass])
  if (wait) {
    return (
      <>
        <Spinner />
      </>
    )
  } else {

    return (
      <>
        {Loading ? <Spinner /> : <></>}
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} /> : <></>}
        {forgetPassword || AdminforgetPass ? <ForgetPassPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} forgetPassword={forgetPassword} /> : <></>}
        {showAddressPopup ? <AddressPopup setShowAddressPopup={setShowAddressPopup} /> : null}

        <Navbar setShowLogin={setShowLogin} setShowAddressPopup={setShowAddressPopup} />
        <div className='app container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart setShowAddressPopup={setShowAddressPopup} />} />
            <Route path='/order' element={<Placeholder />} />
            <Route path='/order/:id' element={<Specific_Order />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  }

}


export default App
