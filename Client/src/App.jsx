import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeholder from './pages/Placeholder/Placeholder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from './context/StoreContext'
import axios from 'axios'
import Specific_Order from './pages/SpecificOrder/Specific_Order'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const { setCartItems, setOrders_Details,Authenticated ,setAuthenticated} = useContext(StoreContext);
  const fetchcartitems = async () => {
    const res = await axios.post('http://localhost:4000/cartitems', {}, { withCredentials: true }).then((res) => { return res }).catch((e) => { });
    console.log(res);
    if ((!res.code || res.auth)&& res.data.length!==undefined) {
      const transformData = () => {
        return res.data.data.reduce((acc, item) => {
          // Convert Pizza_id to string to ensure it works as a key in Mongoose Map
          acc[item.Pizza_id.toString()] = item.quantity;
          return acc;
        }, {});
      };
      setCartItems(transformData);
    }
  }
  const fetchOrdersdetails = async() => {
    try {
      const response = await axios.post('http://localhost:4000/Orders', {}, { withCredentials: true });
      setOrders_Details(response.data.data); // Assuming response.data is the array of orders
      console.log(response.data)
      if(response.data.auth){
        setAuthenticated(true);
        return;
      }else{
        return
      }
    } catch (e) {
    }
  }

  // }
  useEffect(() => {
    fetchcartitems();
    fetchOrdersdetails();
  }, [Authenticated]);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeholder />} />
          <Route path ='/order/:id' element={<Specific_Order/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App