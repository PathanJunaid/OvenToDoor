import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Specific_Order.css'
import FooditemsOrder from '../../components/FooditemsOrder/FooditemsOrder';

const Specific_Order = () => {
  return (
    <>
      <div className='food-display-list-order'>
        <div className='food-item-order'>
          <div className="">

          </div>
          <div className="food-item-info-order">
            <h3>Item</h3>
          </div>
          <div className='item-Quantity-order'>
            <h3>Quantity</h3>
          </div>
          <div>
            <h3>Price</h3>

          </div>
        </div>


        <FooditemsOrder/>
      </div>
    </>
  )
}

export default Specific_Order