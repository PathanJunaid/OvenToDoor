import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { AdminStoreContext } from '../context/AdminStoreContextProvider';
import axios from 'axios';

const AdminLogin = () => {
  const { setAdminAuthenticated, setShowloginModel,setresponsemsg } = useContext(AdminStoreContext)
  const [currState, setCurrState] = useState("AdminLogin");
  const [error, seterror] = useState("");
  const [formdata, setformdata] = useState({
    User_Name: "",
    Email: "",
    Password: "",

  });
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setformdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const HandleformSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:4000/Admin/login', { ...formdata }, { withCredentials: true }).then((res) => {
      return res.data
    }).catch((e) => {
      console.log(e)
    })
    console.log(res)
    if (res.error) {
      seterror(res.msg)
      setresponsemsg(res.msg)
      setTimeout(() => {
        seterror("")
        setresponsemsg("")
      }, 3000);
    } else {
      setformdata({
        Email: "",
        Password: ""
      });
      setresponsemsg(res.msg)
      setTimeout(() => {
        seterror("")
        setresponsemsg("")
      }, 2000);
      // ShowloginModel(false);
      setAdminAuthenticated(true);
      setShowloginModel(false)
    }
  }
  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={(e) => {
        currState === "AdminSign Up" ? HandleformSubmitSign(e) : HandleformSubmit(e)
      }}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowloginModel(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">

          {currState === "AdminLogin" ? <></> : <input type="text" name='User_Name' value={formdata.User_Name} onChange={(e) => { HandleInput(e) }} placeholder='Your Name' required />}
          <input type="email" name='Email' placeholder='Your email' value={formdata.Email} onChange={(e) => { HandleInput(e) }} required />

          <input type="password" name='Password' placeholder='Password' value={formdata.Password} onChange={(e) => { HandleInput(e) }} required />
          {currState === "AdminLogin" ?
            <h6 className='Forget-Password' onClick={() => { setforgetPassword(true); ShowloginModel(false) }}>Forget Password?</h6>
            : ""}
        </div>
        {error !== "" ?
          <div className='error-login'>
            {error}
          </div>

          : ""}
        <button>{currState === "AdminSign Up" ? "Create account" : "AdminLogin"}</button>


        <div className="login-popup-conditon">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>

        </div>
        {currState === "AdminLogin" ?
          <p>Create a new accoount? <span onClick={() => { setCurrState("AdminSign Up") }}>Click here</span></p>
          :
          <p>Already have an account? <span onClick={() => { setCurrState("AdminLogin") }}>Login here</span></p>
        }



      </form>
    </div>
  )
}

export default AdminLogin