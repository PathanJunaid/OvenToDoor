import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { Food_List } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you </h2>
      <div className="food-display-list">
        {Food_List.length > 0 ? Food_List.map((item, index) => {
          if (category === 'All' || category === item.Category) {
            return <FoodItem Food_Item={item} />
          }
        })
          :
          ""
        }
      </div>
    </div>
  )
}

export default FoodDisplay
