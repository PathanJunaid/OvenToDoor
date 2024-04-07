import { useEffect, useState } from "react";
import RegisterContext from './RegisterContext';
import axios from "axios";
import Navbar from "./Component/User Component/Navbar";
import Error from "./Component/Error/Error";
import Add_Pizza from "./Component/Restorent/Add_Pizza";
function App() {
  const [UserLoggedIn,setUserLoggedIn]  = useState(false)
  return (
    <div>
      <Error error = {"this is Error"}/>
      <RegisterContext.Provider value={[UserLoggedIn,setUserLoggedIn]}>
        <Navbar/>
        <Add_Pizza/>
    </RegisterContext.Provider>
    </div>
  );
}

export default App;
