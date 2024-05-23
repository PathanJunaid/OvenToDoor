import React, { useContext } from 'react'
import './Placeholder.css'
import { StoreContext } from '../../context/StoreContext'
import Header from '../../components/Header/Header'
import Orders from '../../components/Orders/Orders'
import { Navigate } from 'react-router-dom'
const Placeholder = () => {
  const { Orders_Details,Authenticated } = useContext(StoreContext);
  if (!Authenticated) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <div>
      <Header />
      <div className="Order_Container">
        <div className="Order_id">Order_ID</div>
        <div className="Order_Date">Order date</div>
        <div className="Amount">Amount Paid</div>
        <div className="Status">Delivery Status</div>
        <div className="Total_items">View Details</div>
      </div>
      <Orders Orders_Det = {Orders_Details}/>
    </div>
  )
}

export default Placeholder
