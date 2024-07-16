import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import './FooditemsOrder.css'
const FooditemsOrder = () => {
    const { Food_List, fetchOrdersdetails, Orders_Details } = useContext(StoreContext);
    const [Address, setAddress] = useState(null);
    const [items, setitems] = useState([]);
    const id = useParams().id;
    const [date, setdate] = useState(null)
    const [Load, setLoad] = useState(true)
    const [status, setstatus] = useState(null)
    // const []
    let total_amount = 0;
    useEffect(() => {
        const fetchData = async () => {
            setLoad(true);
            await fetchOrdersdetails();
            setLoad(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (Orders_Details) {
            try {
                const order = Orders_Details.find((ele) => ele.Order_id === id);
                if (order) {
                    setitems(order.Items_id);
                    setAddress(order.Address);
                    setstatus(order.Status);
                    const customDate = new Date(order.createdAt);
                    const options = {
                        timeZone: 'Asia/Kolkata', // Set timezone to Indian Standard Time
                        hour12: false, // Use 24-hour format
                    };
                    // Format the custom date and time according to the options
                    const ISTDateTime = customDate.toLocaleString('en-IN', options);
                    setdate(ISTDateTime.split(', '));
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [Orders_Details, id]);
    return (
        <>
            {Load ? <p>Loading...</p> :

                <div className='food-display-list-order'>
                    <div>
                        <div className="Order-id-time">Order id : {id}</div>
                        <div className="Order-id-time">
                            {
                                date !== null ?
                                    <>
                                        <p className="date">Date: {date[0]}</p>
                                        <p className="time">Time:{date[1]}</p>
                                    </> 
                                    : ""
                            }
                        </div>
                    </div>
                    <div className='food-item-order-head'>
                        <div className="food-item-info-order">
                            <h3>Item</h3>
                        </div>
                        <div className='item-Quantity-order'>
                            <h3 className='d-sm-none'>Qty</h3>
                            <h3 className='d-none d-sm-block'>Quantity</h3>
                        </div>
                        <div>
                            <h3>Price</h3>

                        </div>
                    </div>

                    {
                        items !== undefined ? items.map((ele) => {
                            const item = Food_List.find((Dish) => {
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
                                        <p className="food-item-desc-order d-lg-block d-none">
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
                            : ""
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
                </div>
            }
        </>

    )
}

export default FooditemsOrder