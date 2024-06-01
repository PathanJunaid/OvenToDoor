import React, { useContext, useEffect, useState } from 'react';
import './Admin_Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import { socket } from '../../Socket/Socket';

const Admin_Navbar = ({ }) => {
  const [menu, setMenu] = useState("menu");
  const { AdminAuthenticated, setAdminAuthenticated, setShowloginModel,socketId,setnotification,notification } = useContext(AdminStoreContext);
  const [showNotification, setshowNotification] = useState(false)
  useEffect(()=>{
    console.log(socketId);
    socket.on('Handle_Order',(data)=>{
      console.log(data);
      setnotification([...notification,data])
    })
  },[])
  const HandleLogout = async () => {
    const data = window.confirm("Do you want to Logout?")
    if (data) {
      const res = await axios.post('http://localhost:4000/admin/logout', {}, { withCredentials: true }).then((res) => {
        console.log(res);
        return res.data;
      }).catch((e) => {
        console.log(e);
      });
      if (!res.error) {
        setAdminAuthenticated(false);
      }

    }
  };

  return (
    <div className='navbar' id='Navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <ul className='navbar-menu'>
        <Link to='/admin' onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>
          home
        </Link>
        {AdminAuthenticated ?
          <Link to='/admin/order' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? 'active' : ''}>Order</Link> : ""}
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}> contact-us</a>
      </ul>
      <div className="navbar-right">
        <div>
          <div>
            {/* <i class="fa-solid fa-bell fa-2xl"></i> */}
            <div class="admin-dropdown">
              {
                AdminAuthenticated ?
                  <p class="admin-dropdown-toggle" onClick={(e) => setshowNotification(!showNotification)}><i class="fa-solid fa-bell fa-2xl"></i>
                  </p>
                  : ""}
              {
                showNotification ?
                  <>
                    <span class="notification-count">3</span>
                    <div class="admin-dropdown-menu">
                      <div class="admin-notification">
                        <p>New comment on your post</p>
                        <span>5 minutes ago</span>
                      </div>
                      <div class="admin-notification">
                        <p>New follower</p>
                        <span>10 minutes ago</span>
                      </div>
                      <div class="admin-notification">
                        <p>Update available</p>
                        <span>30 minutes ago</span>
                      </div>
                    </div>
                  </>
                  :
                  ""
              }
            </div>
          </div>
        </div>
        <div>
          {
            AdminAuthenticated ?
              <button onClick={() => { HandleLogout() }}>Logout</button>
              :
              <button onClick={() => { setShowloginModel(true) }}>Login</button>

          }
        </div>
      </div>
    </div>
  );
};

export default Admin_Navbar;