// AddressForm.jsx

import React, { useState } from 'react';
import './AddressForm.css'; // Import the CSS file for styling
import {assets} from '../../assets/assets'
// assets/cross_icon'; // Import the close icon image

const AddressForm = ({ setShowAddressPopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    houseNo: '',
    area: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, such as sending data to backend
    console.log(formData);
    onClose(); // Close the address form popup after submission
  };

  return (
    <div className="address-popup">
      <div className="address-popup-header">
      </div>
      <div className="address-popup-container">
        <h2>Add Address</h2>
        <button className="close-btn" onClick={()=>setShowAddressPopup(false)}>
          {/* Small close button in the upper left corner */}
          <img src={assets.cross_icon} alt="Close" />
        </button>
        <form className="address-form" onSubmit={handleSubmit}>
          {/* Input fields */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="houseNo"
            placeholder="House No."
            value={formData.houseNo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
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