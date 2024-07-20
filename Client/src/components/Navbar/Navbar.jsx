import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import SavedAddress from '../SavedAddress/SavedAddress';
import "../../index.css"
import PropTypes from 'prop-types'
const Navbar = ({ setShowLogin, setShowAddressPopup }) => { // Add setShowAddressPopup prop
  const { pathname } = useLocation();
  let path = pathname;
  if (pathname.indexOf('/', 1) != -1) {
    path = pathname.slice(0, pathname.indexOf('/', 1));
  }
  const navigate = useNavigate();
  const [menu, setMenu] = useState(path);
  const { setCartItems, Authenticated, setAuthenticated, cartItems } = useContext(StoreContext);
  const [ShowSavedAddresses, setShowSavedAddresses] = useState(false)
  const fetchcartitems = async () => {
    const res = await axios.post(`${import.meta.env.VITE_APP_Server}/cartitems`, {}, { withCredentials: true }).then((res) => { return res }).catch(() => { });
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
      const res = await axios.post(`${import.meta.env.VITE_APP_Server}/logout`, {}, { withCredentials: true }).then((res) => {
        console.log(res);
        navigate('/');
        return res.data;
      }).catch((e) => {
        console.log(e);
      });
      if (!res.error) {
        setAuthenticated(false);
      }

    }
  };
  const HandleOffcanvas = () => {
    const offcanvasElement = document.querySelector('[data-bs-dismiss="offcanvas"]');
    if (offcanvasElement) {
      offcanvasElement.click();
    }
  }

  return (
    <div className='navbar navbar-expand-lg navbar-boxshadow' id='Navbar'>
      <div className='container'>
        <img className='logo' src={assets.logo} alt="" />
        {/* for display with max-wdth 980px  cart and toggle button*/}
        <div className='toggle-cart-navbar'>
          <div className={menu === '/cart' ? 'active navbar-search-icon d-lg-none' : 'navbar-search-icon d-lg-none'} onClick={() => { fetchcartitems; setMenu("/cart") }}>
            {Authenticated ?
              <>
                <div className='Parent-ele'>
                  <Link to="/cart" >
                    <img src={assets.basket_icon} alt="" />
                  </Link>
                  <div className='Child-ele'>
                    {Object.values(cartItems).reduce((sum, prev) => sum + prev, 0)}
                  </div>
                </div>
              </>
              : ""
            }
          </div>
          <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>
        {/* for display with min-width 980px   */}
        <div className="collapse navbar-collapse justify-content-around" id="navbarSupportedContent">
          <ul className='navbar-menu'>
            <Link to='/' onClick={() => setMenu("/")} className={menu === '/' ? 'active' : ''}>
              Home
            </Link>
            {Authenticated ?
              <Link to='/order' onClick={() => setMenu("/order")} className={menu === '/order' ? 'active' : ''}>Order</Link> : ""}
            <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}>Contact-us</a>
          </ul>
          <ul className="navbar-right"> {/* Added ms-auto for right alignment */}
            <div className={menu === '/cart' ? 'active navbar-search-icon' : 'navbar-search-icon'} onClick={() => { fetchcartitems; setMenu("/cart") }}>
              {Authenticated ?
                <>
                  <div className='Parent-ele'>
                    <Link to="/cart">
                      {/* <i class="fa-solid fa-cart-shopping fa-xl"></i> */}
                      <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div className='Child-ele'>
                      {Object.values(cartItems).reduce((sum, prev) => sum + prev, 0)}
                    </div>
                  </div>
                </>
                : ""
              }
            </div>

            <div className="address-dropdown">
              {Authenticated ?
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

            <div>
              {Authenticated ?
                <button onClick={() => { HandleLogout() }}>Logout</button> :
                <button onClick={() => setShowLogin(true)}>Sign In</button>}
            </div>

            {ShowSavedAddresses && (
              <SavedAddress onClose={() => setShowSavedAddresses(false)} />
            )}
          </ul>

        </div>
        {/* {for display width max width 980px navbar } */}
        <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5> */}
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className='navbar-menu'>
              <Link to='/' onClick={() => { setMenu("/"); HandleOffcanvas() }} className={menu === '/' ? 'active' : ''}>
                Home
              </Link>
              {Authenticated ?
                <Link to='/order' onClick={() => { setMenu("/order"); HandleOffcanvas() }} className={menu === '/order' ? 'active' : ''}>Order</Link> : ""}
              <a href='#footer' onClick={() => { setMenu("contact-us"); HandleOffcanvas() }} className={menu === 'contact-us' ? 'active' : ''}>Contact-us</a>
            </ul>
            <ul className="navbar-right ms-auto"> {/* Added ms-auto for right alignment */}
              <div className="address-dropdown">
                {Authenticated ?
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

              <div>
                {Authenticated ?
                  <button onClick={() => { HandleLogout(); HandleOffcanvas() }}>Logout</button> :
                  <button onClick={() => { setShowLogin(true); HandleOffcanvas() }}>Sign In</button>}
              </div>

              {ShowSavedAddresses && (
                <SavedAddress onClose={() => setShowSavedAddresses(false)} />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};
Navbar.propTypes = {
  setShowLogin:PropTypes.func,
  setShowAddressPopup: PropTypes.func
}
export default Navbar;