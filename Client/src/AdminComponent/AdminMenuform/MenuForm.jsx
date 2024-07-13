import React, { useContext, useRef, useState, useEffect } from 'react';
import './MenuForm.css'; // Import your custom CSS
import axios from 'axios';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const MenuForm = ({ Data, Req_Type }) => {
  const { _id } = useParams();
  const [formData, setFormData] = useState(Data);
  const { setresponsemsg, fetchadminMenu } = useContext(AdminStoreContext);
  const [validated, setValidated] = useState(false);
  const fileInputRef = useRef(null); // Create a reference for the file input
  const [preview, setPreview] = useState(null); // State for image preview
  const navigate = useNavigate();
  useEffect(() => {
    // Set the preview image when formData changes
    if (formData.Image) {
      setPreview(formData.Image);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }));

    // Set the preview if a file is selected
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (Req_Type) {
        const res = await axios.post('http://localhost:4000/Admin/NewPizza', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          setFormData({
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
          });
          setPreview(null);
          fileInputRef.current.value = null;
          // console.log()
          setresponsemsg(res.data.msg)
          fetchadminMenu();
          navigate('/admin')
        }).catch((e) => {
          console.log('Unable to add Dish')
        });
      } else {
        const res = await axios.post(`http://localhost:4000/Admin/Edit_Item/${_id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          setPreview(null);
          fileInputRef.current.value = null;
          setresponsemsg(res.data.Msg)
          fetchadminMenu();
          navigate('/admin');
        }).catch((e) => {
          console.log('Unable to add Dish')
        });
        // return <Redirect to='/Admin'></Redirect>
      }
    }

    setValidated(true);
  };

  return (
    <div className="form-container mt-5">
      <form onSubmit={handleSubmit} className={`needs-validation  ${validated ? 'was-validated' : ''}`}>
        <div className='menu-form'>
          <div className="mb-3">
            <label htmlFor="DishName" className="form-label">Dish Name:</label>
            <input
              type="text"
              className="form-control"
              id="DishName"
              name="DishName"
              value={formData.DishName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a dish name.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Category" className="form-label">Category:</label>
            <select
              className="form-select"
              id="Category"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              {/* <option value=""></option> */}
            </select>
            <div className="invalid-feedback">Please select a category.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description:</label>
            <textarea
              className="form-control"
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a description.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Ingredients" className="form-label">Ingredients:</label>
            <textarea
              className="form-control"
              id="Ingredients"
              name="Ingredients"
              value={formData.Ingredients}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide the ingredients.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Price" className="form-label">Price:</label>
            <input
              type="number"
              className="form-control"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a price.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Discounts" className="form-label">Discounts/Offers:</label>
            <input
              type="text"
              className="form-control"
              id="Discounts"
              name="Discounts"
              value={formData.Discounts}
              readOnly
            />
            <div className="valid-feedback">Not Available</div>
          </div>

          <div className="mb-3">
            <label htmlFor="ServingSize" className="form-label">Serving Size:</label>
            <input
              type="text"
              className="form-control"
              id="ServingSize"
              name="ServingSize"
              value={formData.ServingSize}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a serving size.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="PreparationTime" className="form-label">Preparation Time (in minutes):</label>
            <input
              type="number"
              className="form-control"
              id="PreparationTime"
              name="PreparationTime"
              value={formData.PreparationTime}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a preparation time.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Image" className="form-label">Image:</label>
            {
              Req_Type ?
                <input
                  type="file"
                  className="form-control"
                  id="Image"
                  name="Image"
                  onChange={handleChange}
                  ref={fileInputRef}
                  required
                />
                :
                <input
                  type="file"
                  className="form-control"
                  id="Image"
                  name="Image"
                  onChange={handleChange}
                  ref={fileInputRef}
                />


            }
            <div className="invalid-feedback">Please upload an image.</div>
            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Preview" className="img-preview" />
              </div>
            )}
          </div>


          <div className="mb-3">
            <label className="form-label">Availability:</label>
            <div className="radio-group mb-1">
              {['All day', 'Breakfast only', 'Seasonal'].map((option) => (
                <div className="form-check" key={option}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Availability"
                    id={option}
                    value={option}
                    checked={formData.Availability === option}
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))}
              <div className="invalid-feedback">Please select availability.</div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-all">{Req_Type ? "Submit" : "Edit"}</button>
      </form>
    </div>
  );
};

export default MenuForm;
