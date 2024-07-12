import React, { useContext } from 'react'
import { AdminStoreContext } from '../context/AdminStoreContextProvider';
import AdminOrderList from '../AdminComponent/AdminOrderList/AdminOrderList';

export const AdminOrder = () => {
    const {Orders} = useContext(AdminStoreContext);
  return (
    <div>
      <div className="Order_Container">
        <div className="Amount">User Name</div>
        <div className="Order_id">Order_ID</div>
        <div className="Status">Delivery Status</div>
        <div className="Order_Date">Order date</div>
        <div className="Total_items">View Details</div>
      </div>
      <AdminOrderList/>
    </div>
  )
}
