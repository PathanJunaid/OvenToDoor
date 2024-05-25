import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin, setShowAddressPopup }) => { // Add setShowAddressPopup prop
  const [menu, setMenu] = useState("menu");
  const { setCartItems, Authenticated, setAuthenticated, cartItems } = useContext(StoreContext);

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
    const res = await axios.post('http://localhost:4000/logout', {}, { withCredentials: true }).then((res) => {
      console.log(res);
      return res.data;
    }).catch((e) => {
      console.log(e);
    });
    if (!res.error) {
      setAuthenticated(false);
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
        <div className="navbar-search-icon" onClick={() => fetchcartitems()}>
          {Authenticated ?
            <>
              <div className='Parent-ele'>
                <div className='Child-ele'>{Object.keys(cartItems).length}</div>
              </div>
              <Link to="/cart">
                <img src={assets.basket_icon} alt="" />
              </Link>
            </> : ""}
        </div>
        <div>
          {Authenticated ?
            <button onClick={() => { HandleLogout() }}>Logout</button> :
            <button onClick={() => setShowLogin(true)}> sign in</button>}
        </div>
        <button onClick={() => setShowAddressPopup(true)}>Add Address</button> {/* Add button to trigger address popup */}
      </div>
    </div>
  );
};

export default Navbar;