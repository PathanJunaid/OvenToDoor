// import React, { useContext, useEffect, useState } from 'react'
// import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home/Home'
// import Cart from './pages/Cart/Cart'
// import Placeholder from './pages/Placeholder/Placeholder'
// import Footer from './components/Footer/Footer'
// import LoginPopup from './components/LoginPopup/LoginPopup'
// import ForgetPassPopup from './components/ForgetPassPopup/ForgetPassPopup'
// import { StoreContext } from './context/StoreContext'
// import axios from 'axios'
// import Specific_Order from './pages/SpecificOrder/Specific_Order'
// import Spinner from './components/Spinner/Spinner'


// const App = () => {

//   const [showLogin, setShowLogin] = useState(false)
//   const [forgetPassword, setforgetPassword] = useState(false)
//   const { setCartItems, setOrders_Details,Authenticated ,setAuthenticated,Loading} = useContext(StoreContext);
//   const fetchcartitems = async () => {
//     const res = await axios.post('http://localhost:4000/cartitems', {}, { withCredentials: true }).then((res) => { return res.data }).catch((e) => { });
//     if ((!res.code || res.auth)&& res.data.length!==undefined) {
//       const transformData = () => {
//         return res.data.reduce((acc, item) => {
//           // Convert Pizza_id to string to ensure it works as a key in Mongoose Map
//           acc[item.Pizza_id.toString()] = item.quantity;
//           return acc;
//         }, {});
//       };
//       setCartItems(transformData);
//     }
//   }
//   const fetchOrdersdetails = async() => {
//     try {
//       const response = await axios.post('http://localhost:4000/Orders', {}, { withCredentials: true });
//       setOrders_Details(response.data.data); // Assuming response.data is the array of orders
//       // console.log(response.data)
//       if(response.data.auth){
//         setAuthenticated(true);
//         return;
//       }else{
//         return
//       }
//     } catch (e) {
//     }
//   }
//   useEffect(() => {
//     fetchcartitems();
//     fetchOrdersdetails();
//   }, [Authenticated]);

//   return (
//     <>
//     {Loading? <Spinner/>: <></>}
//       {showLogin ? <LoginPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} /> : <></>}
//       {forgetPassword ? <ForgetPassPopup setShowLogin={setShowLogin} setforgetPassword={setforgetPassword} forgetPassword={forgetPassword}/> : <></>}
//       <div className='app'>
//         <Navbar setShowLogin={setShowLogin} />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/order' element={<Placeholder />} />
//           <Route path ='/order/:id' element={<Specific_Order/>}/>
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default App



import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeholder from './pages/Placeholder/Placeholder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ForgetPassPopup from './components/ForgetPassPopup/ForgetPassPopup';
import { StoreContext } from './context/StoreContext';
import axios from 'axios';
import Specific_Order from './pages/SpecificOrder/Specific_Order';
import Spinner from './components/Spinner/Spinner';
import AddressPopup from './components/AddressPopup/AddressPopup'; // Import the AddressPopup component

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false); // State to control visibility of address popup
  const { setCartItems, setOrders_Details, Authenticated, setAuthenticated, Loading } = useContext(StoreContext);

  const fetchcartitems = async () => {
    try {
      const res = await axios.post('http://localhost:4000/cartitems', {}, { withCredentials: true });
      if ((!res.data.code || res.data.auth) && res.data.data.length !== undefined) {
        const transformData = () => {
          return res.data.data.reduce((acc, item) => {
            acc[item.Pizza_id.toString()] = item.quantity;
            return acc;
          }, {});
        };
        setCartItems(transformData);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchOrdersdetails = async () => {
    try {
      const response = await axios.post('http://localhost:4000/Orders', {}, { withCredentials: true });
      setOrders_Details(response.data.data);
      if (response.data.auth) {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error("Error fetching orders details:", error);
    }
  };

  useEffect(() => {
    fetchcartitems();
    fetchOrdersdetails();
  }, [Authenticated]);

  return (
    <>
      {Loading ? <Spinner /> : null}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setForgetPassword={setForgetPassword} /> : null}
      {forgetPassword ? <ForgetPassPopup setShowLogin={setShowLogin} setForgetPassword={setForgetPassword} forgetPassword={forgetPassword} /> : null}
      {showAddressPopup ? <AddressPopup setShowAddressPopup={setShowAddressPopup} /> : null} {/* Render AddressPopup if showAddressPopup is true */}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowAddressPopup={setShowAddressPopup} /> {/* Pass setShowAddressPopup function to Navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeholder />} />
          <Route path='/order/:id' element={<Specific_Order />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;




