import React from 'react'
import { Link } from 'react-router-dom'
import './Order.css'
const Orders = ({ Orders_Det }) => {
  console.log(Orders_Det);
  
  return (
    <>

      {Orders_Det.length <1 ?
      <h4>
        No previous orders
      </h4>
       :
        Orders_Det.map((ele) => {
          // console.log()
          return (
            <div className="Order_Container" key={ele.Order_id}>
              <div className="Order_id">{ele.Order_id}</div>
              <div className="Order_Date">{ele.createdAt}</div>
              <div className="Amount">{ele.Payment_of}</div>
              <div className="Status">{ele.Status}</div>
              <div className="">
                <Link to={`/order/${ele.Order_id}`} className='View_detail' >View Detail</Link>
              </div>
            </div>

          )
        })}
    </>
  )
}

export default Orders