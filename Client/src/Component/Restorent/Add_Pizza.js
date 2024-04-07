import axios from 'axios';
import React, { useState } from 'react'

const Add_Pizza = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formdata, setformdata] = useState({
        Pizza_id: 'Pizza one',
        Pizza_Name: 'Onion Pizza',
        Veg: true,
        Price: 80,
        Description: 'This a Onion hand toosed pizza',
        Is_Small:true,
        Is_Medium:true,
        Is_Large:false,
        Small_Price:80,
        Medium_Price:150,
        Large_Price:200,

    })
    // Handler for file input change
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value })
    }
    const handlesubmit = (e) => {

        // console.log(e)
        e.preventDefault();
        if (selectedFile) {
            const formFile = new FormData();
            formFile.append('file', selectedFile);
            Object.entries(formdata).forEach(([key, value]) => {
                formFile.append(key, value);
            });
            axios.post('http://localhost:4000/Admin/NewPizza', formFile, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then((res) => {
            }).catch((err) => {
                console.log(err)
            })

        }
        // console.log(e.value)

    }
    return (
        <form className='w-50 mx-auto my-5' onSubmit={(e) => handlesubmit(e)} >
            <div className="mb-3">
                <input type='text' name='DishName' value={formdata.DishName} onChange={(e) => handleChange(e)} placeholder='Enter Dish name' />
                <label htmlFor="exampleFormControlInput1" className="form-label text-start">Files</label>
                <input type='file' className="form-control" id="exampleFormControlInput1" onChange={handleFileChange} />
                <button type='submit'>Upload</button>
            </div>
        </form>
    )
}

export default Add_Pizza

