import React, { useContext } from 'react'
import AdminOrderList from '../AdminComponent/AdminOrderList/AdminOrderList';
import { AdminStoreContext } from '../context/AdminStoreContextProvider';

export const AdminOrder = () => {
  const {Orders} = useContext(AdminStoreContext)
  return (
    <div className='Order_Details_Container'>
      {Orders.length < 1 ?
        <h4>
          No previous orders
        </h4>
        :
        <table className='table-container'>
          <thead>
            <tr className="Order_Rows fw-bold">
              <td className="table-cell">User Name</td>
              <td className="table-cell">Order_ID</td>
              <td className="table-cell">Delivery Status</td>
              <td className="table-cell">Order date</td>
              <td className="table-cell">View Details</td>
            </tr>

          </thead>
          <AdminOrderList />
        </table>
      }
    </div>
  )
}
