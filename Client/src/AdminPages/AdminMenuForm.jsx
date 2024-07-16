import React from 'react'
import MenuForm from '../AdminComponent/AdminMenuform/MenuForm'
const AdminMenuForm = () => {
  const Formdata = {
    DishName: '',
    Category: '',
    Description: '',
    Ingredients: '',
    Price: '',
    Discounts: 'Not Available',
    ServingSize: '',
    PreparationTime: '',
    Image: null,
    Availability: '',
  }
  return (
    <div>
    <h5 className='form-container text-center mb-4'>add new dish</h5>
    <MenuForm Data={Formdata} Req_Type = {true}/>
        
    </div>
  )
}

export default AdminMenuForm