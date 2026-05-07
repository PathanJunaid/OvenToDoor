import React, { useContext } from 'react'
import MenuForm from '../AdminComponent/AdminMenuform/MenuForm'
import { useParams } from 'react-router-dom'
import { AdminStoreContext } from '../context/AdminStoreContextProvider';
import { StoreContext } from '../context/StoreContext';

const AdminDishEdit = () => {
    const {_id} = useParams();
    const {Menu} = useContext(AdminStoreContext);
    const {setLoading} = useContext(StoreContext)
    const SingleItem =Menu.find((ele)=>{
        return ele._id === _id;
    })
  return (
    <>
    <div className='fs-4'>Edit {SingleItem.DishName}</div>
    {
        SingleItem?
        <>
        <MenuForm Data={SingleItem} Req_Type={false}/>
        </>
        :
        setLoading(true)
        
    }
    </>
  )
}

export default AdminDishEdit