import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
const LoginPopup = ({ setShowLogin }) => {
  const { setAuthenticated } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [error, seterror] = useState("")
  const [formdata, setformdata] = useState({
    Email: "",
    Password: ""
  })
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setformdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const HandleformSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/login', { ...formdata }, { withCredentials: true }).then((res) => {
      return res.data
    }).catch((e) => {
      console.log(e)
    })
    if (res.auth) {
      setformdata({
        Email: "",
        Password: ""
      });
      setShowLogin(false);
      setAuthenticated(true)
    } else {
      seterror(res.msg)
      const timeot = setTimeout(() => {
        seterror("")
      }, 3000);
    }
  }
  console.log(error)
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={(e) => { HandleformSubmit(e) }}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">

          {currState === "Login" ? <></> : <input type="text" placeholder='Your Name' required />}
          <input type="email" name='Email' placeholder='Your email' value={formdata.Email} onChange={(e) => { HandleInput(e) }} required />
          <input type="password" name='Password' placeholder='Password' value={formdata.Password} onChange={(e) => { HandleInput(e) }} required />
        </div>
        {error !== "" ?
          <div className='error-login'>
            {error}
          </div>

          : ""}
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-conditon">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>

        </div>
        {currState === "Login" ?
          <p>Create a new accoount? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          :
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }



      </form>
    </div>
  )
}

export default LoginPopup
