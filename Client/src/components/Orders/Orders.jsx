import React from 'react'
import { Link } from 'react-router-dom'
import './Order.css'
const Orders = ({ Orders_Det }) => {
  console.log(Orders_Det);

  return (
    <>

      {Orders_Det.length < 1 ?
        <h4>
          No previous orders
        </h4>
        :
        Orders_Det.map((ele) => {
          // Create a Date object with the desired date and time
          const customDate = new Date(ele.createdAt);

          // Options for formatting the date and time
          const options = {
            timeZone: 'Asia/Kolkata', // Set timezone to Indian Standard Time
            hour12: false, // Use 24-hour format
          };

          // Format the custom date and time according to the options
          const ISTDateTime = customDate.toLocaleString('en-IN', options);

          console.log(ISTDateTime); // Output the formatted date and time
          return (
            <div className="Order_Container" key={ele.Order_id}>
              <div className="Order_id">{ele.Order_id}</div>
              <div className="Order_Date">
                {ISTDateTime}
                {/* {date} <br /> {time} */}
              </div>
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