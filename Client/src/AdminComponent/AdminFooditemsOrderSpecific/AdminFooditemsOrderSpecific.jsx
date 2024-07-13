import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../components/FooditemsOrder/FooditemsOrder.css'
import { AdminStoreContext } from '../../context/AdminStoreContextProvider';
import Spinner from '../../components/Spinner/Spinner'
const AdminFooditemsOrderSpecific = () => {
    const { Menu, fetchadminorders, Orders } = useContext(AdminStoreContext);
    const [Address, setAddress] = useState(null);
    const [items, setitems] = useState([]);
    const [id, setid] = useState(useParams()._id);
    const [Load, setLoad] = useState(true)
    const [status, setstatus] = useState(null)
    let total_amount = 0;
    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);
            await fetchadminorders();
            setLoad(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (Orders) {
            try {
                const order = Orders.find((ele) => ele.Order_id === id);
                if (order) {
                    setitems(order.Items_id);
                    setAddress(order.Address);
                    setstatus(order.Status)
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [Orders, id]);
    return (
        <>
            {Load ? <Spinner /> :

                <>
                    {
                        items !== undefined ? items.map((ele) => {

                            const item = Menu.find((Dish) => {
                                return Dish.Dish_Id === ele.Dish_Id;
                            })
                            total_amount += ele.quantity * item.Price;
                            return (

                                <div className='food-item-order' key={ele.Dish_Id}>
                                    <div className="food-item-img-container-order">
                                        <img className='food-item-image-order' src={item.Image} alt='' />
                                    </div>
                                    <div className="food-item-info-order">
                                        <div className="food-item-name-rating-order">
                                            <p>{item.DishName}</p>
                                            {/* <img src={assets.rating_starts} alt="" /> */}
                                        </div>
                                        <p className="food-item-desc-order d-none d-lg-block">
                                            {item.Description}
                                        </p>
                                        <p className="food-item-price-order">
                                            Rs.{item.Price}/-
                                        </p>
                                    </div>
                                    <div className='item-Quantity-order'>
                                        <p>{ele.quantity}</p>
                                    </div>
                                    <div>
                                        <p>Rs.{ele.quantity * item.Price}/-</p>

                                    </div>
                                </div>
                            )
                        })


                            : "Unable to Load data"
                    }
                    <div className='Order-Address-container'>
                        {
                            Address !== null ?
                                <div className='Order-Address-Status'>
                                    <div className='Order-address'>
                                        <h4>Delivered Address</h4>
                                        <p>{Address.Name}</p>
                                        <p>{Address.Mobile_No}</p>
                                        <p>{Address.House_No}, {Address.Area}, {Address.City}, {Address.PIN}</p>
                                    </div>
                                    <div>
                                        <h4>Status</h4>
                                        <p>{status}</p>
                                    </div>
                                </div>
                                : ""
                        }


                    </div>
                    <div className='Total-Del-box d-flex justify-content-between'>
                        <h4>Delivery Charge</h4>
                        <h4>

                            Rs.30/-
                        </h4>
                    </div>
                    <div className='Total-Del-box'>
                        <h4>Total Amount</h4>
                        <h4>

                            Rs.{total_amount + 30}/-
                        </h4>
                    </div>
                </>
            }
        </>

    )
}

export default AdminFooditemsOrderSpecific