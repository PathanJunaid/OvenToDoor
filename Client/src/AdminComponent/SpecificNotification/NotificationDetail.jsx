import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import { socket } from '../../Socket/Socket';

const NotificationDetail = () => {
    const { notification } = useContext(AdminStoreContext);
    const {id} = useParams();
    useEffect(()=>{
        socket.emit('Order_id',id);
        socket.on('Order_id_data',(data)=>{
            console.log(data);
        })
    },[])
    notification.find((ele)=>{
        return ele._id ===id;
    })
    
  return (
    <div>NotificationDetail</div>
  )
}

export default NotificationDetail;