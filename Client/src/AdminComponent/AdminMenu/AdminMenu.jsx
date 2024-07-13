import React, { useContext } from 'react';
import './AdminMenuCards.css';
import AdminMenuCards from './AdminMenuCards';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';

const AdminMenu = () => {
    const { Menu, MenuCategory, setMenuCategory } = useContext(AdminStoreContext);
    return (
        <>
            <ExploreMenu category={MenuCategory} setCategory={setMenuCategory} />
            <div className='Menu_Container'>
                {
                    Menu.map((ele) => {
                        if (MenuCategory === 'All' || MenuCategory === ele.Category) {

                            return <AdminMenuCards SingleItem={ele} key={ele._Dish_Id} />
                        }
                    }
                    )
                }
            </div>
        </>
    )
}

export default AdminMenu