import React, { useContext } from 'react'
import './Cart.css'
import CartItem from '../../components/CartItem/CartItem'
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const {cartItems, Authenticated} = useContext(StoreContext);
  if (!Authenticated) {
    return (
      <h5 className='Inavlid-request'>Invalid request</h5>
    )
  }
  return (
    <div style={{margin:"3rem 0rem"}}>
      {/* <Header/> */}
      <CartItem Items={cartItems}/>
    </div>
  )
}

export default Cart
