// AddressPopup.js
import React, { useState } from 'react';
import './AddressPopup.css';

import AddressForm from '../AddressForm/AddressForm';

const AddressPopup = ({ setShowAddressPopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    houseNo: '',
    area: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
    // Close the address popup
    setShowAddressPopup(false);
  };

  return (
    <div className="address-popup">
      <div className="address-popup-container">
        <h2>Add New Address</h2>
        <button className="close-btn" onClick={() => setShowAddressPopup(false)}>Close</button>
        <AddressForm formData={formData} setShowAddressPopup={setShowAddressPopup} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddressPopup;