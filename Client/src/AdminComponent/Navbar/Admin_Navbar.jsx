import React, { useContext, useEffect, useState } from 'react';
import './Admin_Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import { socket } from '../../Socket/Socket';
import { DateTime } from '../../Functons/Function';

const Admin_Navbar = ({ }) => {
  const [menu, setMenu] = useState("menu");
  const { AdminAuthenticated, setAdminAuthenticated, setShowloginModel, socketId, setnotification, notification } = useContext(AdminStoreContext);
  const [showNotification, setshowNotification] = useState(false);
  const [notificationlength, setnotificationlength] = useState(4);
  useEffect(() => {
    console.log(socketId);
    socket.on('Handle_Order', (data) => {
      console.log(data);
      setnotification([data, ...notification])
    })
  }, [])
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
            {/* <i className="fa-solid fa-bell fa-2xl"></i> */}
            <div className="admin-dropdown">
              {
                AdminAuthenticated ?
                  <>
                    <p className="admin-dropdown-toggle" onClick={(e) => setshowNotification(!showNotification)}><i className="fa-solid fa-bell fa-2xl"></i>
                    </p>
                  </>
                  : ""}
              {
                showNotification ?
                  <>
                    <span className="notification-count">3</span>
                    <div className='dropdown-arrow'>
                    <i id='fa-bounce' className="fa-solid fa-caret-down"></i>
                    </div>
                    {notification.length != 0 ? <>
                      <div className="admin-dropdown-menu">
                        {
                          notification.map((ele, index) => {
                            if (index > 4) {
                              // setnotificationlength(notification);
                              return (
                                ""
                              );
                            } else {
                              const Date = DateTime(ele.createdAt);
                              return (
                                <>
                                  <div className="admin-notification" key={ele.Notification_id}>
                                    <p>New Order id {ele.Order_id} Request from {ele.User_Name}</p>
                                    <span>Date : {Date.formattedDate} Time : {Date.formattedTime}</span>
                                  </div>
                                </>
                              )

                            }
                          })
                        }

                      </div>
                    </>
                      : ""}
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