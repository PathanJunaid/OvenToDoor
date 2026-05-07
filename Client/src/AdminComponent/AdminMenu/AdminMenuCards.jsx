import React, { useContext } from 'react';
import './AdminMenuCards.css'
import { Link } from 'react-router-dom';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import axios from 'axios';
import PropTypes from 'prop-types'
const FoodItem = ({ SingleItem })=> {
  const { setresponsemsg, fetchadminorders, fetchadminMenu } = useContext(AdminStoreContext);
  const {
    Availability,
    Category,
    Description,
    Discounts,
    DishName,
    Image,
    Ingredients,
    PreparationTime,
    Price,
    ServingSize,
    created_at,
    updated_at,
  } = SingleItem;
  const handleMenuItemDelete = async (_id, name) => {
    const value = window.confirm(`${name} will be unavailable for customers`)
    if (!value) {
      return ""
    }
    await axios.delete(`${import.meta.env.VITE_APP_Server}/Admin/Delete_Item/${_id}`).then((res) => {
      if (res.data.status) {
        setresponsemsg(res.data.msg);
        setTimeout(() => {
          setresponsemsg("")
        }, 3000);
        fetchadminMenu();
        fetchadminorders();
      }
    })
  }

  return (
    <div className='food-detail-item'>
      <div className="food-detail-img-container">
        <img className='food-detail-image' src={Image} alt={DishName} />
        <div className='food-detail-actions'>
          <Link to={`/Admin/Menuform/Edit/${SingleItem._id}`} className='food-detail-edit-btn'><i className="fa-regular fa-pen-to-square"></i></Link>
          <button className='food-detail-delete-btn' onClick={() => handleMenuItemDelete(SingleItem._id, DishName)}><i className="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <div className="food-detail-info">
        <div className="food-detail-name-rating">
          <p>{DishName}</p>
        </div>
        <p className="food-detail-desc">
          {Description}
        </p>
        <p className="food-detail-price">
          Rs.{Price}/-
        </p>
        <p><strong>Ingredients:</strong> {Ingredients}</p>
        <p><strong>Discounts:</strong> {Discounts}</p>
        <p><strong>Preparation Time:</strong> {PreparationTime} minutes</p>
        <p><strong>Category:</strong> {Category}</p>
        <p><strong>Availability:</strong> {Availability}</p>
        <p><strong>Serving Size:</strong> {ServingSize}</p>
        <p><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};
FoodItem.propTypes = {
  SingleItem: PropTypes.shape({
    Availability: PropTypes.string.isRequired,
    Category: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Discounts: PropTypes.string,
    DishName: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Ingredients: PropTypes.string,
    PreparationTime: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    ServingSize: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};
export default FoodItem;
