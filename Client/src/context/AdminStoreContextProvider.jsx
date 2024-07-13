import React, { createContext, useState } from 'react'
import axios from 'axios'
export const AdminStoreContext = createContext(null);

const AdminStoreContextProvider = (props) => {
  const [AdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [Orders, setOrders] = useState([]);
  const [ShowloginModel, setShowloginModel] = useState(true);
  const [responsemsg, setresponsemsg] = useState("");
  const [socketId, setsocketId] = useState(null);
  const [notification, setnotification] = useState([]);
  const [Menu, setMenu] = useState([]);
  const [AdminforgetPass, setAdminforgetPass] = useState(false);
  const [MenuCategory, setMenuCategory] = useState("Salad")
  const fetchadminorders = async () => {
    try {
      const response = await axios.post("http://localhost:4000/Admin/orders", {}, { withCredentials: true }).then((res) => {
        return res.data;
      }).catch((e) => {
        console.log(e)
        // console.log("True")
      });
      if (response.auth) {
        setAdminAuthenticated(true);
        setShowloginModel(false)
        setOrders(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        // console.log("True")
      }

    } catch (e) {
      console.log("Error")
    }
  }
  const fetchadminMenu = async () => {
    try {
      const response = await axios.post("http://localhost:4000/Admin/Menu", {}, { withCredentials: true }).then((res) => {
        return res.data;
      }).catch((e) => {
        console.log(e)
      });
      if (response.status) {
        setMenu(response.data);
      }

    } catch (e) {
      console.log("Error in Fetching Menu")
    }
  }
  const Adminvalues = {
    AdminAuthenticated, setAdminAuthenticated,
    Orders, setOrders,
    ShowloginModel, setShowloginModel,
    responsemsg, setresponsemsg,
    socketId, setsocketId,
    notification, setnotification,
    Menu, setMenu,
    fetchadminMenu, fetchadminorders,
    AdminforgetPass, setAdminforgetPass,
    MenuCategory, setMenuCategory
  }

  return (
    <AdminStoreContext.Provider value={Adminvalues}>
      {props.children}
    </AdminStoreContext.Provider>
  )
}

export default AdminStoreContextProvider