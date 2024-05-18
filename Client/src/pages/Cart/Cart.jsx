import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
  const [cartItems] = useContext(StoreContext);
  return (
    <div>
      
    </div>
  )
}

export default Cart
