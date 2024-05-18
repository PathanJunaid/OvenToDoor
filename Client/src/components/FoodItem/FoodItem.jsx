import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({Pizza_id,Pizza_Name,Price,Description,Image}) => {

   

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);


  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={Image}alt=''/>
            {!cartItems[Pizza_id]
            ? <img className='add' onClick={()=>addToCart(Pizza_id)} src={assets.add_icon_white} alt=''/>
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(Pizza_id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[Pizza_id]}</p>
                <img onClick={()=>addToCart(Pizza_id)} src={assets.add_icon_green} alt="" />

            </div>
            }
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{Pizza_Name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
            {Description}
        </p>
        <p className="food-item-price">
            Rs.{Price}/-
        </p>
      </div>
    </div>
  )
}

export default FoodItem
