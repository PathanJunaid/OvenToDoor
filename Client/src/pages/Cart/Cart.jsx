import React, { useContext } from 'react'
import './Cart.css'
import CartItem from '../../components/CartItem/CartItem'
import { StoreContext } from '../../context/StoreContext';

const Cart = ({setShowAddressPopup}) => {
  const { Authenticated} = useContext(StoreContext);
  if (!Authenticated) {
    return (
      <h5 className='Inavlid-request'>Invalid request</h5>
    )
  }
  return (
    <div style={{margin:"2rem 0rem"}}>
      {/* <Header/> */}
      <CartItem setShowAddressPopup={setShowAddressPopup}/>
    </div>
  )
}

export default Cart
