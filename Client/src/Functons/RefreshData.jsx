import React, { useContext, useEffect } from 'react'
import { AdminStoreContext } from '../context/AdminStoreContextProvider';

const RefreshData = () => {
  const {setAdminAuthenticated,setShowloginModel,setOrders,setMenu} = useContext(AdminStoreContext);s
  const fetchadminorders = async () => {
    try {
        const response = await axios.post("http://localhost:4000/Admin/orders", {}, { withCredentials: true }).then((res) => {
            return res.data;
        }).catch((e) => {
            console.log(e)
        });
        if (response.auth) {
            setAdminAuthenticated(true);
            setShowloginModel(false)
            setOrders(response.data);
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
  useEffect(()=>{
      fetchadminMenu();
      fetchadminorders();
  })
}
export default RefreshData;