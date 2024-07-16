import React, { useContext, useEffect, useState } from 'react'
import './ForgetPassPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { AdminStoreContext } from '../../context/AdminStoreContextProvider'
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types'
const ForgetPassPopup = ({ setforgetPassword }) => {
  const {  setLoading,Loading} = useContext(StoreContext);
  const {AdminforgetPass} =useContext(AdminStoreContext);
  const [error, seterror] = useState("");
  const [verifyOTP, setverifyOTP] = useState(false)
  const [formdata, setformdata] = useState({
    Email: "",
    Password: "",
    OTP: ""
  })
  useEffect(()=>{
    setLoading(false);

  },[])
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
    const urlforgetpass  = AdminforgetPass? 'Admin/forgetpassword' : 'forgetpassword';
    const res = await axios.post(`http://localhost:4000/${urlforgetpass}`, { ...formdata }).then((res) => {
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
      setTimeout(() => {
        seterror("")
      }, 2000);
    }
    
  }
  const HandleformVerifyOTP = async (e) => {
    setLoading(true)
    e.preventDefault();
    const urlvalidate  = AdminforgetPass? 'Admin/ValidateOTP' : 'ValidateOTP';
    await axios.post(`http://localhost:4000/${urlvalidate}`, { ...formdata }).then((res) => {
      seterror(res.data.msg)
      setTimeout(() => {
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
    <>
    {Loading? <Spinner/> : ""}
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
    </>
  )
}
ForgetPassPopup.propTypes = {
  setforgetPassword: PropTypes.func.isRequired
}
export default ForgetPassPopup
