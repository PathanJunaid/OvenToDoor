import React, { useContext, useState } from 'react';
import './SavedAddress.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Import the assets, including cross_icon
import { StoreContext } from '../../context/StoreContext';

const SavedAddress = ({ onClose }) => {
  const {Address} = useContext(StoreContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: '',
    House_No: '',
    Area: '',
    City: '',
    PIN: ''
  });
  console.log(editFormData)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEdit = (index) => {
    console.log(Address)
    const data = Address.find((ele)=>{
      return ele._id===index
    })
    setEditingIndex(index);
    setEditFormData(data);
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
          // console.log(address)
          return(
            <li key={address._id}>
              {editingIndex === address._id ? (
                <form className="edit-address-form" onSubmit={() => handleSave(address._id)}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editFormData.Name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="houseNo"
                    placeholder="House No."
                    value={editFormData.House_No}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="area"
                    placeholder="Area"
                    value={editFormData.Area}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={editFormData.City}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={editFormData.PIN}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="button" onClick={() => handleSave(address._id)}>Save</button>
                </form>
              ) : (
                <>
                  <p>{address.Name}</p>
                  <p>{address.House_No}, {address.Area}, {address.City}, {address.PIN}</p>
                  <button onClick={() => handleEdit(address._id)}>Edit</button>
                  <button onClick={() => handleDelete(address._id)}>Delete</button>
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