import React, { useContext } from 'react'
import axios from 'axios';
import RegisterContext from '../../RegisterContext';
const Logout = () => {
    const [UserLoggedIn,setUserLoggedIn]  = useContext(RegisterContext)
    // Handle Logout Form Request 
    const handleLogout = (e)=>{
        e.preventDefault();
        console.log("Logout Triggered")
        axios.post('http://localhost:4000/Admin/logout',{UserLoggedIn},{ withCredentials: true })
        .then((response)=>{
            console.log(response.data);
            setUserLoggedIn(false);
        }).catch((e)=>{
            console.log("Logout Failed");
        })
    }
    // Close the Login Model backdrop Container 
    try{
        document.getElementById("Login_Close").click();
    }catch(e){}
  return (
    <div>
        <form onSubmit={(e)=>handleLogout(e)}>
            <button type='submit' className='btn btn-primary'>Logout</button>
        </form>
    </div>
  )
}

export default Logout