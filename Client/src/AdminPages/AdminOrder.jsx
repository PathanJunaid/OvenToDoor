import React, { useContext } from 'react'
import { AdminStoreContext } from '../context/AdminStoreContextProvider';
import AdminOrderList from '../AdminComponent/AdminOrderList/AdminOrderList';

export const AdminOrder = () => {
  const { Orders } = useContext(AdminStoreContext);
  return (
    <div className='Order_Details_Container'>
      <table className='table-container'>
        <tr className="Order_Rows fw-bold">
          <td className="table-cell">User Name</td>
          <td className="table-cell">Order_ID</td>
          <td className="table-cell">Delivery Status</td>
          <td className="table-cell">Order date</td>
          <td className="table-cell">View Details</td>
        </tr>
        <AdminOrderList />
      </table>
    </div>
  )
}
