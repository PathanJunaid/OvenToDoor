import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// import './Order.css'
import { AdminStoreContext } from '../../context/AdminStoreContextProvider'
const AdminOrderList = () => {
    const {Orders} = useContext(AdminStoreContext);
  return (
    <>

      {Orders.length < 1 ?
        <h4>
          No previous orders
        </h4>
        :
        Orders.map((ele) => {
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
              <td className="table-cell">{ele.Address.Name}</td>
              <td className="table-cell">{ele.Order_id}</td>
              <td className="table-cell">{ele.Status}</td>
              <td className="table-cell">
                {ISTDateTime}
                {/* {date} <br /> {time} */}
              </td>
              <td className="table-cell">
                <Link to={`/admin/order/${ele.Order_id}`} className='View_detail' >View Detail</Link>
              </td>
            </tr>

          )
        })}
    </>
  )
}

export default AdminOrderList