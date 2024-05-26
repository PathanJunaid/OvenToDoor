import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import SavedAddress from '../SavedAddress/SavedAddress';

const Navbar = ({ setShowLogin, setShowAddressPopup }) => { // Add setShowAddressPopup prop
  const [menu, setMenu] = useState("menu");
  const { setCartItems, Authenticated, setAuthenticated, cartItems, Address } = useContext(StoreContext);
  const [ShowSavedAddresses,setShowSavedAddresses]= useState(false)
  console.log(Address)

  const fetchcartitems = async () => {
    const res = await axios.post('http://localhost:4000/cartitems', {}, { withCredentials: true }).then((res) => { return res }).catch((e) => { });
    console.log(res);
    if (!res.code || res.auth) {
      const transformData = () => {
        return res.data.data.reduce((acc, item) => {
          // Convert Pizza_id to string to ensure it works as a key in Mongoose Map
          acc[item.Pizza_id.toString()] = item.quantity;
          return acc;
        }, {});
      };
      setCartItems(transformData);
    }
  };

  const HandleLogout = async () => {
    const data = window.confirm("Do you want to Logout?")
    if (data) {
      const res = await axios.post('http://localhost:4000/logout', {}, { withCredentials: true }).then((res) => {
        console.log(res);
        return res.data;
      }).catch((e) => {
        console.log(e);
      });
      if (!res.error) {
        setAuthenticated(false);
      }

    }
  };

  return (
    <div className='navbar' id='Navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>
          <a href="#navbar">home</a>
        </Link>
        {Authenticated ?
          <Link to='/order' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? 'active' : ''}>Order</Link> : ""}
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}> contact-us</a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon" onClick={() => { fetchcartitems }}>
          {
            Authenticated ?
              <>
                <div className='Parent-ele'>
                  <div className='Child-ele'>
                    {
                      Object.values(cartItems).reduce((sum, prev) => sum + prev, 0)
                    }
                  </div>
                </div>
                <Link to="/cart">
                  <img src={assets.basket_icon} alt="" />
                  {/* <div className="dot"></div> */}
                </Link>

              </>
              : ""
          }
        </div>
        <div>
          {Authenticated ?
            <button onClick={() => { HandleLogout() }}>Logout</button> :
            <button onClick={() => setShowLogin(true)}> sign in</button>}
        </div>
        <div className="address-dropdown">
          {
            Authenticated ?
              <>
                <button className="dropdown-btn">Address</button>
                <div className="dropdown-content">
                  <button onClick={() => { setShowAddressPopup(true) }}>Add Address</button>
                  <button onClick={() => { setShowSavedAddresses(true) }}>Saved Address</button>
                </div>
              </>

              : ""
          }
        </div>
        {
          ShowSavedAddresses && (
            <SavedAddress 
            
          onClose={() => setShowSavedAddresses(false)}/>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;