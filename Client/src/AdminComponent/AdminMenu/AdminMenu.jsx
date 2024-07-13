import React, { useContext } from 'react';
import './AdminMenuCards.css';
import AdminMenuCards from './AdminMenuCards';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';

const AdminMenu = () => {
    const { Menu } = useContext(AdminStoreContext);
    return (
        <>
            <div className='Menu_Container'>
                {
                    Menu.map((ele) => {
                        return <AdminMenuCards SingleItem={ele} key={ele._Dish_Id} />
                    }
                    )
                }
            </div>
        </>
    )
}

export default AdminMenu