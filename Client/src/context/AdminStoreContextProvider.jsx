import React, { createContext, useState } from 'react'

export const AdminStoreContext = createContext(null);

const AdminStoreContextProvider = (props) => {
    const [AdminAuthenticated, setAdminAuthenticated] = useState(false);
    const [Orders, setOrders] = useState([]);
    const [ShowloginModel, setShowloginModel] = useState(false);

    const Adminvalues = {
        AdminAuthenticated, setAdminAuthenticated, Orders, setOrders, ShowloginModel, setShowloginModel
    }

    return (
        <AdminStoreContext.Provider value={Adminvalues}>
            {props.children}
        </AdminStoreContext.Provider>
    )
}

export default AdminStoreContextProvider