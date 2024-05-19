import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list}= useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you </h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
            if(category==='All' || category===item.Category){
                return <FoodItem key={index} Pizza_id={item.Pizza_id} Pizza_Name={item.Pizza_Name} Description={item.Description} Price={item.Price} Image={item.Image} />
            }


           

        })}
      </div>
    </div>
  )
}

export default FoodDisplay
