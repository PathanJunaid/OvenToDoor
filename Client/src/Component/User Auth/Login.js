import React, { useContext, useState } from 'react'
import axios from 'axios';
import RegisterContext from '../../RegisterContext';
import User_Login_terms from './Userinfo_API/UserData';
import Error from '../Error/Error';
// import cryptojs from 'crypto-js';
const Login = () => {
    const [formdata, setformdata] = useState({
        Email: "",
        Password: ""
    }
    )
    const Login_terms = User_Login_terms;
    Object.entries(Login_terms).map((terms) => {
        return terms;
    })

    const [UserLoggedIn, setUserLoggedIn] = useContext(RegisterContext)
    const InputEmail = (e) => {
        setformdata({ ...formdata, Email: e.target.value });
    }
    const InputPassword = (e) => {
        setformdata({ ...formdata, Password: e.target.value });
        console.log(formdata)
    }
    const HandleSubmitLogin = (e) => {
        e.preventDefault();
        // console.log("form")
        axios.post('http://localhost:4000/Admin/login', formdata, { withCredentials: true })
            .then(function (response) {
                console.log('Response:', response);
                console.log(response.data)
                setUserLoggedIn(response.data.isLogged);
            })
            .catch(function (error) {
                // try{
                //     document.getElementById("Login_Close").click();
                // }catch(e){}
                console.log('Server 404')
                return (
                    <Error error={"Server not responded"} />
                )

            });
    }


    return (
        <>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Login
            </button>
            <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='Login_Close'></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => HandleSubmitLogin(e)} >

                                {/* <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">{terms[0]}</label>
                                                <input type={terms[1][0].type} className="form-control" id="exampleFormControlInput1" placeholder={terms[1][0].placeholder} onChange={terms[1][0].onchange} />
                                            </div> */}
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label" >Email</label>
                                    <input type='email' className="form-control" value={formdata.email} onChange={(e) => InputEmail(e)} id="exampleFormControlInput1" placeholder="name@example.com" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                                    <input type="password" id="inputPassword5" value={formdata.password} className="form-control" aria-describedby="passwordHelpBlock" onChange={(e) => InputPassword(e)} required />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <button className='btn btn-primary' type='submit'>Submit</button>
                                    <button className='btn btn-primary' type='Reset'>New User?</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login