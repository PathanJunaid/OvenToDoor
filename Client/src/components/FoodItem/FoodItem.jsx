import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({Food_Item}) => {

   

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);


  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={Food_Item.Image}alt=''/>
            {!cartItems[Food_Item.Dish_Id]
            ? <img className='add' onClick={()=>addToCart(Food_Item.Dish_Id)} src={assets.add_icon_white} alt=''/>
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(Food_Item.Dish_Id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[Food_Item.Dish_Id]}</p>
                <img onClick={()=>addToCart(Food_Item.Dish_Id)} src={assets.add_icon_green} alt="" />

            </div>
            }
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{Food_Item.DishName}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
            {Food_Item.Description}
        </p>
        <p className="food-item-price">
            Rs.{Food_Item.Price}/-
        </p>
      </div>
    </div>
  )
}

export default FoodItem
