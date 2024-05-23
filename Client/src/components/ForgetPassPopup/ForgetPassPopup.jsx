import React, { useContext, useEffect, useState } from 'react'
import './ForgetPassPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
const ForgetPassPopup = ({ setShowLogin, setforgetPassword, forgetPassword }) => {
  const { setAuthenticated ,setLoading} = useContext(StoreContext);
  const [error, seterror] = useState("");
  const [verifyOTP, setverifyOTP] = useState(false)
  const [formdata, setformdata] = useState({
    Email: "",
    Password: "",
    OTP: ""
  })
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setformdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const HandleformGetOTP = async (e) => {
    setLoading(true)
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/forgetpassword', { ...formdata }).then((res) => {
      setverifyOTP(true);
      console.log(res)
      return res.data
    }).catch((e) => {
      
      console.log(e)
    }).finally(()=>{
      setLoading(false);
    })
    if(res.error){
      seterror(res.msg);
      setverifyOTP(false)
      const timeout = setTimeout(() => {
        seterror("")
      }, 2000);
    }else{

    }
    
  }
  const HandleformVerifyOTP = async (e) => {
    setLoading(true)
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/ValidateOTP', { ...formdata }).then((res) => {
      seterror(res.data.msg)
      const timeout = setTimeout(() => {
        setforgetPassword(false);
        seterror("")
      }, 1500);
      return res.data
    }).catch((e) => {
      
      console.log(e)
    }).finally(()=>{
      setLoading(false);
    })
    
  }
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={(e) => {
        verifyOTP ?HandleformVerifyOTP(e): HandleformGetOTP(e)  
      }}>
        <div className="login-popup-title">
          <h2>Reset pasword</h2>
          <img onClick={() => setforgetPassword(false)} src={assets.cross_icon} alt="" />
        </div>
            <div className="login-popup-inputs">

              <input type="email" name='Email' placeholder='Your email' value={formdata.Email} onChange={(e) => { HandleInput(e) }} required />
              {verifyOTP ?
                <>
                <input type="password" name='Password' placeholder='New Password' value={formdata.Password} onChange={(e) => { HandleInput(e) }} required />
                <input type="number" name='OTP' placeholder='Enter 6 digit OTP' value={formdata.OTP} onChange={(e) => { HandleInput(e) }} maxLength={6} required />
                
                </>
                :
                <></>
              }
            </div>
        {error !== "" ?
          <div className='error-login'>
            {error}
          </div>

          : ""}
        {
          verifyOTP ?
          <button>Change Password</button>
          :
          <button>Send OTP</button>
        }
      </form>
    </div>
  )
}

export default ForgetPassPopup
