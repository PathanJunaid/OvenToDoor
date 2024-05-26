import React, { useContext, useState } from 'react';
import './SavedAddress.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Import the assets, including cross_icon
import { StoreContext } from '../../context/StoreContext';

const SavedAddress = ({ onClose }) => {
  const {Address} = useContext(StoreContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    houseNo: '',
    area: '',
    city: '',
    pincode: ''
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData(savedAddresses[index]);
  };

  const handleSave = (index) => {
    const updatedAddresses = [...savedAddresses];
    updatedAddresses[index] = editFormData;
    setSavedAddresses(updatedAddresses);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedAddresses = savedAddresses.filter((_, i) => i !== index);
    setSavedAddresses(updatedAddresses);
  };

  return (
    <div className="saved-address-popup">
      <div className="saved-address-header">
        <button className="close-btn" onClick={onClose}>
          <img src={assets.cross_icon} alt="Close" />
        </button>
      </div>
      <div className="saved-address-container">
        <h2>Saved Addresses</h2>
        <ul>
          {Address.map((address, index) => {
          console.log(address)
          return(
            <li key={address._id}>
              {editingIndex === address._id ? (
                <form className="edit-address-form" onSubmit={() => handleSave(index)}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="houseNo"
                    placeholder="House No."
                    value={editFormData.houseNo}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="area"
                    placeholder="Area"
                    value={editFormData.area}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={editFormData.city}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={editFormData.pincode}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="button" onClick={() => handleSave(index)}>Save</button>
                </form>
              ) : (
                <>
                  <p>{address.Name}</p>
                  <p>{address.House_No}, {address.Area}, {address.City}, {address.PIN}</p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
};

export default SavedAddress;