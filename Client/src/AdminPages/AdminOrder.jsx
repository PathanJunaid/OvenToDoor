import React, { useContext } from 'react'
import { AdminStoreContext } from '../context/AdminStoreContextProvider';
import AdminOrderList from '../AdminComponent/AdminOrderList/AdminOrderList';

export const AdminOrder = () => {
    const {Orders,setOrders} = useContext(AdminStoreContext);
    console.log(Orders)
  return (
    <div>
      <div className="Order_Container">
        <div className="Order_id">Order_ID</div>
        <div className="Order_Date">Order date</div>
        <div className="Amount">Amount Paid</div>
        <div className="Status">Delivery Status</div>
        <div className="Total_items">View Details</div>
      </div>
      <AdminOrderList/>
    </div>
  )
}
