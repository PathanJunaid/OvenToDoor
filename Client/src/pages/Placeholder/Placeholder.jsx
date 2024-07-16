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
        {
          Orders_Details.length < 1 ?
            <h4>
              No previous orders
            </h4>
            :
            <table className='table-container'>
              <thead>
                <tr className="Order_Rows fw-bold">
                  <td className="table-cell">Order_ID</td>
                  <td className="table-cell">Order date</td>
                  <td className="table-cell">Amount Paid</td>
                  <td className="table-cell">Delivery Status</td>
                  <td className="table-cell">View Details</td>
                </tr>
              </thead>

              <tbody>
                <Orders/>
              </tbody>
            </table>
        }

      </div>
    </div>
  )
}

export default Placeholder
