// AddressForm.jsx

import React, { useState } from 'react';
import './AddressForm.css'; // Import the CSS file for styling
import {assets} from '../../assets/assets';
import axios from "axios"
// assets/cross_icon'; // Import the close icon image

const AddressForm = ({ setShowAddressPopup }) => {
  const [formData, setFormData] = useState({
    Name: '',
    House_No: '',
    Area: '',
    City: '',
    PIN: '',
    Mobile_No:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic here to handle form submission, such as sending data to backend
    const res = await axios.post('http://localhost:4000/Add/Address',{...formData},{withCredentials:true}).then((res)=>{
      setFormData({
        Name: '',
        House_No: '',
        Area: '',
        City: '',
        PIN: '',
        Mobile_No:""
      })
      return res;
    }).catch((e)=>{
      console.log(e)
    })
    console.log(formData);
    setShowAddressPopup(false);
    // onClose(); // Close the address form popup after submission
  };

  return (
    <div className="address-popup">
      <div className="address-popup-header">
      </div>
      <div className="address-popup-container">
        <h2>Your Address</h2>
        <button className="close-btn" onClick={()=>setShowAddressPopup(false)}>
          {/* Small close button in the upper left corner */}
          <img src={assets.cross_icon} alt="Close" />
        </button>
        <form className="address-form" onSubmit={handleSubmit}>
          {/* Input fields */}
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="Mobile_No"
            placeholder="Mobile No"
            value={formData.Mobile_No}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="House_No"
            placeholder="House No."
            value={formData.House_No}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Area"
            placeholder="Area"
            value={formData.Area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="City"
            placeholder="City"
            value={formData.City}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="PIN"
            placeholder="Pincode"
            value={formData.PIN}
            onChange={handleChange}
            required
          />
          

          <button type="submit">Add Address</button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;