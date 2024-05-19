import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
const LoginPopup = ({ setShowLogin }) => {
  const { setAuthenticated } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [error, seterror] = useState("");
  const [forgetpass, setforgetpass] = useState(false)
  const [formdata, setformdata] = useState({
    User_Name: "",
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
  const HandleformSubmitSign = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/Signup', { ...formdata }, { withCredentials: true }).then((res) => {
      return res.data
    }).catch((e) => {
      console.log(e)
    })
    if (res.error) {
      seterror(res.msg)
      const timeot = setTimeout(() => {
        seterror("")
      }, 3000);
    } else {
      seterror(res.msg)
      const timeot = setTimeout(() => {
        seterror("")
      }, 3000);
      setformdata({
        User_Name: "",
        Email: "",
        Password: ""
      });
      setCurrState("Login")
    }
  }
  if (forgetpass) {
    console.log("Count");
    // setforgetpass(false)
  }
  useEffect(() => {
    setformdata({
      User_Name: "",
      Email: "",
      Password: ""
    });
  }, [currState])
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={(e) => {
        currState === "Sign Up" ? HandleformSubmitSign(e) : HandleformSubmit(e)
      }}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        {
          forgetpass ?
            <div className="login-popup-inputs">

              {currState === "Login" ? <></> : <input type="text" name='User_Name' value={formdata.User_Name} onChange={(e) => { HandleInput(e) }} placeholder='Your Name' required />}
              <input type="email" name='Email' placeholder='Your email' value={formdata.Email} onChange={(e) => { HandleInput(e) }} required />
              {forgetpass ?
                ""
                :
                <input type="password" name='Password' placeholder='Password' value={formdata.Password} onChange={(e) => { HandleInput(e) }} required />
                // <input type="number" name='' placeholder='OTP' value={formdata.OTP} onChange={(e) => { HandleInput(e) }} required />
              }
              <h6 className='Forget-Password' onClick={() => setforgetpass(true)}>Forget Password?</h6>
            </div>
            :


            <div className="login-popup-inputs">

              {currState === "Login" ? <></> : <input type="text" name='User_Name' value={formdata.User_Name} onChange={(e) => { HandleInput(e) }} placeholder='Your Name' required />}
              <input type="email" name='Email' placeholder='Your email' value={formdata.Email} onChange={(e) => { HandleInput(e) }} required />
              <input type="password" name='Password' placeholder='Password' value={formdata.Password} onChange={(e) => { HandleInput(e) }} required />
              <h6 className='Forget-Password' onClick={() => setforgetpass(true)}>Forget Password?</h6>
            </div>
        }
        {error !== "" ?
          <div className='error-login'>
            {error}
          </div>

          : ""}
        {
          forgetpass ?
            <button>Send OTP</button>
            :
            <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        }

        <div className="login-popup-conditon">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>

        </div>
        {currState === "Login" ?
          <p>Create a new accoount? <span onClick={() => {setCurrState("Sign Up");setforgetpass(false)}}>Click here</span></p>
          :
          <p>Already have an account? <span onClick={() => {setCurrState("Login");setforgetpass(false)}}>Login here</span></p>
        }



      </form>
    </div>
  )
}

export default LoginPopup
