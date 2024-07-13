import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Order.css'
import { StoreContext } from '../../context/StoreContext'
import { socket } from '../../Socket/Socket'
const Orders = ({ Orders_Det }) => {
  const { Orders_Details,fetchOrdersdetails,setOrders_Details } = useContext(StoreContext);
  useEffect(() => {
    socket.on("Refresh_Data_Client", async () => {
      await fetchOrdersdetails();
    });
  })
  return (
    <>

      {Orders_Details.length < 1 ?
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
          return (
            <tr className="Order_Rows" key={ele.Order_id}>
              <td className="table-cell">{ele.Order_id}</td>
              <td className="table-cell">
                {ISTDateTime}
                {/* {date} <br /> {time} */}
              </td>
              <td className="table-cell">{ele.Payment_of}</td>
              <td className="table-cell">{ele.Status}</td>
              <td className="table-cell">
                <Link to={`/order/${ele.Order_id}`} className='View_detail' >View Detail</Link>
              </td>
            </tr>

          )
        })}
    </>
  )
}

export default Orders