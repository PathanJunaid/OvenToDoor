import React, { createContext, useState } from 'react'

export const AdminStoreContext = createContext(null);

const AdminStoreContextProvider = (props) => {
    const [AdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [Orders, setOrders] = useState([]);
    const [ShowloginModel, setShowloginModel] = useState(true);
    const [responsemsg, setresponsemsg] = useState("");
    const [socketId, setsocketId] = useState(null);
    const [notification,setnotification] = useState([]);

    const Adminvalues = {
        AdminAuthenticated, setAdminAuthenticated,
        Orders, setOrders,
        ShowloginModel, setShowloginModel,
        responsemsg, setresponsemsg,
        socketId, setsocketId,
        notification,setnotification
    }

    return (
        <AdminStoreContext.Provider value={Adminvalues}>
            {props.children}
        </AdminStoreContext.Provider>
    )
}

export default AdminStoreContextProvider