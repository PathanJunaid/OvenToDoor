import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import './FooditemsOrder.css'
const FooditemsOrder = () => {
    const { Food_List, fetchOrdersdetails, Orders_Details } = useContext(StoreContext);
    const [Address, setAddress] = useState(null);
    const [items, setitems] = useState([]);
    const [id, setid] = useState(useParams().id);
    const [Load, setLoad] = useState(true)
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
                    setAddress(...order.Address);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [Orders_Details, id]);
    return (
        <>
            {Load ? <p>Loading...</p> :

                <>

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
                                        <p className="food-item-desc-order">
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
                        <h3>Delivered Address</h3>
                        <ul className='Order-address'>
                            {
                                Address !== null ?
                            
                                    <li>
                                            <div>
                                                <p>{Address.Name}</p>
                                                <p>{Address.Mobile_No}</p>
                                                <p>{Address.House_No}, {Address.Area}, {Address.City}, {Address.PIN}</p>

                                            </div>
                                        

                                    </li>
                                    : ""
                            }
                        </ul>

                    </div>
                    <div className='food-item-order'>
                        <div className='Total_amount'>
                            <h3>Delivery Charges</h3>
                        </div>
                        <div className='food-item-info-order'>

                        </div>
                        <div>

                        </div>

                        <div>
                            <h3>

                                Rs.30/-
                            </h3>

                        </div>
                    </div>
                    <div className='food-item-order'>
                        <div className='Total_amount'>
                            <h3>Total Amount</h3>
                        </div>
                        <div className='food-item-info-order'>

                        </div>
                        <div>

                        </div>

                        <div>
                            <h3>

                                Rs.{total_amount + 30}/-
                            </h3>

                        </div>
                    </div>
                </>
            }
        </>

    )
}

export default FooditemsOrder