import React, { useContext } from 'react'
import Login from '../User Auth/Login'
import Logout from '../User Auth/Logout'
import RegisterContext from '../../RegisterContext'

const Navbar = () => {
    const [UserLoggedIn,setUserLoggedIn]  = useContext(RegisterContext)
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">Navbar</a>
                {
                    UserLoggedIn ? <Logout /> : <Login />
                }
            </div>
        </nav>
    )
}

export default Navbar