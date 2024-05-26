import React, { useContext, useState } from 'react';
import './SavedAddress.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets'; // Import the assets, including cross_icon
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const SavedAddress = ({ onClose }) => {
  const {Address,setAddress} = useContext(StoreContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [msg,setmsg] = useState("")
  const [editFormData, setEditFormData] = useState({
    Name: '',
    House_No: '',
    Area: '',
    City: '',
    PIN: '',
    Mobile_No:''
  });
  console.log(editFormData)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log(name + "\t" + value)
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

  const handleSave = async(index) => {
    const response = await axios.post(`http://localhost:4000/Address/edit`,{...editFormData,index},{withCredentials:true}).then((res)=>{
      console.log(res);
      setAddress(res.data.data)
      setmsg(res.data.msg);
      setTimeout(() => {
        setmsg("")
      }, 2000);
      return res;
    }).catch((e)=>{
      console.log(e)
    })
    if(response.data.error){

    }
    setEditingIndex(null);
  };

  const handleDelete = async(index) => {
    const response = await axios.post(`http://localhost:4000/Address/delete`,{index},{withCredentials:true}).then((res)=>{
      console.log(res);
      setAddress(res.data.data)
      setmsg(res.data.msg);
      setTimeout(() => {
        setmsg("")
      }, 2000);
      return res;
    }).catch((e)=>{
      console.log(e)
    })
    if(response.data.error){

    }
    setEditingIndex(null);
    
  };
  return (
    <div className="saved-address-popup">
      <div className="saved-address-header">
      </div>
      <div className="saved-address-container">
        <h2>Saved Addresses</h2>
        <button id="close-btn-address" onClick={onClose}>
          <img src={assets.cross_icon} alt="Close" />
        </button>
        {Address.length===0? <div>No address</div> : ""}
        <ul>
          {Address.map((address, index) => {
          // console.log(address)
          return(
            <li key={address._id}>
              {editingIndex === address._id ? (
                <form className="edit-address-form" onSubmit={() => handleSave(address._id)}>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={editFormData.Name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="House_No"
                    placeholder="House No."
                    value={editFormData.House_No}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="Area"
                    placeholder="Area"
                    value={editFormData.Area}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="City"
                    placeholder="City"
                    value={editFormData.City}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="number"
                    name="PIN"
                    minLength={6} maxLength={6}
                    placeholder="Pincode"
                    value={editFormData.PIN}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="number"
                    minLength={10} maxLength={10}
                    name="Mobile_No"
                    placeholder="Mobile No"
                    value={editFormData.Mobile_No}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="button" onClick={() => handleSave(address._id)}>Save</button>
                </form>
              ) : (
                <>
                  <p>{address.Name}</p>
                  <p>{address.Mobile_No}</p>
                  <p>{address.House_No}, {address.Area}, {address.City}, {address.PIN}</p>
                  <button onClick={() => handleEdit(address._id)}>Edit</button>
                  <button onClick={() => handleDelete(address._id)}>Delete</button>
                </>
              )}
            </li>
          )})}
        </ul>
        <p>
          {msg}
        </p>
      </div>
    </div>
  );
};

export default SavedAddress;