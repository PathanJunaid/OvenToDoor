import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
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
import { URLSearchParams } from 'url'
import { AdminStoreContext } from './context/AdminStoreContextProvider'
import { socket } from './Socket/Socket'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [forgetPassword, setforgetPassword] = useState(false)
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const { setresponsemsg } = useContext(AdminStoreContext);
  const {  Authenticated,  Loading,setLoading,  fetchFood_List,fetchAddressdetails,fetchOrdersdetails,fetchcartitems } = useContext(StoreContext);
  useEffect(() => {
    socket.on("Refresh_Data_Client",async()=>{
      await fetchOrdersdetails();
    })
    const fetchData = async () => {
      await fetchFood_List();
      await fetchcartitems();
      await fetchOrdersdetails();
      await fetchAddressdetails();
    };

    fetchData();
    try{
      const urlParams = new URLSearchParams(window.location.search);
      const msg = urlParams.get('msg');
      // Decode the message if necessary
      const decodedMsg = decodeURIComponent(msg);
      console.log(decodedMsg); // This will log your message
      // Use the decodedMsg as needed
      setresponsemsg(msg);
    }catch(e){
      console.log("No msg")
    }
  }, [Authenticated])
  if (Loading) {
    return (
      <>
        <Spinner />
      </>
    )
  }
  else{
    
  }
  return (
    <>
      {Loading ? <Spinner /> : <></>}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} /> : <></>}
      {forgetPassword ? <ForgetPassPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} forgetPassword={forgetPassword} /> : <></>}
      {showAddressPopup ? <AddressPopup setShowAddressPopup={setShowAddressPopup} /> : null}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowAddressPopup={setShowAddressPopup} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeholder />} />
          <Route path='/order/:id' element={<Specific_Order />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
