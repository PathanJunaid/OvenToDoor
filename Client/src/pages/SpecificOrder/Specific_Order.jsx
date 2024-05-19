import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useParams } from 'react-router-dom';
import './Specific_Order.css'
import FooditemsOrder from '../../components/FooditemsOrder/FooditemsOrder';

const Specific_Order = () => {
  const { Orders_Details, food_list, setOrders_Details } = useContext(StoreContext);
  const fetchOrdersdetails = async () => {
    try {
      const response = await axios.post('http://localhost:4000/Orders', {}, { withCredentials: true });
      setOrders_Details(response.data); // Assuming response.data is the array of orders
    } catch (e) {
    }
  }
  let {id} = useParams()
  useEffect(() => {
    fetchOrdersdetails();
  }, []);
  console.log(Orders_Details)
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


        <FooditemsOrder Orders_Details={Orders_Details} />
      </div>
    </>
  )
}

export default Specific_Order