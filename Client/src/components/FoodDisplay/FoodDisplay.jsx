import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import PropTypes from 'prop-types'
import CustomLoadFile from '../CustomLoad/CustomLoadFile'
const FoodDisplay = ({ category }) => {

  const { Food_List, CustomLoad } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h4>Top dishes near you </h4>
      {
        CustomLoad ?
            <CustomLoadFile/> : ""
      }
      <div className="food-display-list">
        {Food_List.length > 0 ? Food_List.map((item, index) => {
          if (category === 'All' || category === item.Category) {
            return (
              <FoodItem Food_Item={item} key={index} />

            )
          }
        })
          :
          ""
        }
      </div>
    </div>
  )
}
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired
}
export default FoodDisplay
