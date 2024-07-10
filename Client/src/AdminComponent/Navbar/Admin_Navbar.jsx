/* eslint-disable no-empty */
import React, { useContext, useEffect, useState } from "react";
import "./Admin_Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { AdminStoreContext } from "../../context/AdminStoreContextProvider";
import { socket } from "../../Socket/Socket";
import { DateTime } from "../../Functons/Function";
import { StoreContext } from "../../context/StoreContext";

const Admin_Navbar = () => {
  const [menu, setMenu] = useState("Menu");
  const {fetchOrdersdetails,} = useContext(StoreContext)
  const DropdownValue = ["Food is being prepared", "Out for delivery", "Delivered"]
  const {
    AdminAuthenticated,
    setAdminAuthenticated,
    setShowloginModel,
    socketId,
    setnotification,
    notification,
    fetchadminorders,
  } = useContext(AdminStoreContext);
  const [showNotification, setshowNotification] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [notificationlength, setnotificationlength] = useState(4);
  useEffect(() => {
    console.log(socketId);
    socket.on("Handle_Order", (data) => {
      console.log(data);
      setnotification([data, ...notification]);
    });
    socket.on("Refresh_Data_Client",()=>{
      fetchadminorders();
      fetchOrdersdetails();
    })
  }, []);
  const HandleOrderNotification = (Notification_id, Status, Order_id) => {
    if (Status) {
      socket.emit('Order-Status', { socketId, Notification_id, Order_id, Status });


    } else {
    }
  };
  const HandleLogout = async () => {
    const data = window.confirm("Do you want to Logout?");
    if (data) {
      const res = await axios
        .post(
          "http://localhost:4000/admin/logout",
          {},
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
        });
      if (!res.error) {
        setAdminAuthenticated(false);
      }
    }
  };

  return (
    <div className="navbar" id="Navbar">
      <img className="logo" src={assets.logo} alt="" />
      <ul className="navbar-menu">
        <Link
          to="/admin"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </Link>
        {AdminAuthenticated ? (
          <>
            <Link
              to="/admin/order"
              onClick={() => setMenu("Order")}
              className={menu === "Order" ? "active" : ""}
            >
              Order
            </Link>
            <Link to='/admin/Menuform' onClick={() => setMenu("Add Dish")}
              className={menu === "Add Dish" ? "active" : ""}>
              Add Dish
            </Link>
          </>
        ) : (
          ""
        )}
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          {" "}
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <div>
          <div>
            {/* <i className="fa-solid fa-bell fa-2xl"></i> */}
            <div className="admin-dropdown">
              {AdminAuthenticated ? (
                <>
                  <p
                    className="admin-dropdown-toggle"
                    onClick={() => setshowNotification(!showNotification)}
                  >
                    <i className="fa-solid fa-bell fa-2xl"></i>
                  </p>
                  <span className="notification-count">3</span>
                </>
              ) : (
                ""
              )}
              {showNotification ? (
                <>
                  <div className="dropdown-arrow">
                    <i id="fa-bounce" className="fa-solid fa-caret-down"></i>
                  </div>
                  {notification.length != 0 ? (
                    <>
                      <div className="admin-dropdown-menu">
                        {notification.map((ele, index) => {
                          // console.log(ele)
                          if (index > 2) {
                            // setnotificationlength(notification);
                            // continue
                          } else {
                            const Date = DateTime(ele.createdAt);
                            // console.log(ele);
                            return (
                              <>
                                <div
                                  className="admin-notification"
                                  key={ele._id}
                                >
                                  <p>New Order Request from {ele.User_Name}</p>
                                  <span>
                                    Date : {Date.formattedDate} <br />
                                    Time : {Date.formattedTime}
                                  </span>
                                  <div style={{ margin: "5px 0px 0px 0px" }}>
                                    {
                                      ele.Status === "Delivered" ? `${ele.Status}` :
                                        <select class="select_stage" onChange={(e) => HandleOrderNotification(ele._id, e.target.value, ele.Order_id)}>
                                          <option value={ele.Status} default>{ele.Status}</option>
                                          {
                                            DropdownValue.map((elem, index) => {
                                              return (<option className="select_stage_items" value={`${elem}`} key={`${index}`}>{elem}</option>)
                                              // <li><a class="dropdown-item" href="#">Action</a></li>
                                            })
                                          }
                                        </select>

                                    }
                                  </div>
                                  <p
                                    style={{
                                      "text-align": "right",
                                    }}
                                  >
                                    <span className="Expand-text">
                                      View Order
                                    </span>
                                  </p>
                                </div>
                              </>
                            );
                          }
                        })}
                        <p
                          style={{ "text-align": "right", padding: "10px 0px" }}
                        >
                          <Link
                            className="Expand-text"
                            to="/admin/notifications"
                            onClick={() => {
                              setshowNotification(false);
                            }}
                          >
                            Expand
                          </Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div>
          {AdminAuthenticated ? (
            <button
              onClick={() => {
                HandleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setShowloginModel(true);
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_Navbar;
