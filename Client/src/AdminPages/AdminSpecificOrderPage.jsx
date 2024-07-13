import React from 'react'
import '../pages/SpecificOrder/Specific_Order.css'
import AdminFooditemsOrderSpecific from '../AdminComponent/AdminFooditemsOrderSpecific/AdminFooditemsOrderSpecific'

const AdminSpecificOrderPage = () => {
  return (
    <>
      <div className='food-display-list-order'>
        <div className='food-item-order-head'>
          <div className="food-item-info-order">
            <h3>Item</h3>
          </div>
          <div className='item-Quantity-order'>
          <h3 className='d-sm-none'>Qty</h3>
          <h3 className='d-none d-sm-block'>Quantity</h3>
          </div>
          <div>
            <h3>Price</h3>

          </div>
        </div>


        <AdminFooditemsOrderSpecific/>
      </div>
    </>
  )
}

export default AdminSpecificOrderPage