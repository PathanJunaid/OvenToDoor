import React from 'react'
import MenuForm from '../AdminComponent/AdminMenuform/MenuForm'
const AdminMenuForm = () => {
  const Formdata = {
    dishName: '',
    category: '',
    description: '',
    ingredients: '',
    price: '',
    discounts: 'Not Available',
    servingSize: '',
    preparationTime: '',
    image: null,
    availability: '',
  }
  return (
    <div>
    <h5 className='form-container text-center mb-4'>add new dish</h5>
    <MenuForm Data={Formdata} Req_Type = {true}/>
        
    </div>
  )
}

export default AdminMenuForm