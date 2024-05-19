import React, { useContext } from 'react'
import './Cart.css'
import CartItem from '../../components/CartItem/CartItem'
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const {cartItems} = useContext(StoreContext);
  console.log(cartItems)
  return (
    <div style={{margin:"3rem 0rem"}}>
      {/* <Header/> */}
      <CartItem Items={cartItems}/>
    </div>
  )
}

export default Cart
