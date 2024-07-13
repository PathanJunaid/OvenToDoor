import React, { useContext } from 'react'
import './Placeholder.css'
import { StoreContext } from '../../context/StoreContext'
import Header from '../../components/Header/Header'
import Orders from '../../components/Orders/Orders'
const Placeholder = () => {
  const { Orders_Details } = useContext(StoreContext);
  return (
    <div>
      <Header />
      <div className='Order_Details_Container'>
        <table className='table-container'>
          <tr className="Order_Rows fw-bold">
            <td className="table-cell">Order_ID</td>
            <td className="table-cell">Order date</td>
            <td className="table-cell">Amount Paid</td>
            <td className="table-cell">Delivery Status</td>
            <td className="table-cell">View Details</td>
          </tr>

          <Orders Orders_Det={Orders_Details} />
        </table>

      </div>
    </div>
  )
}

export default Placeholder
