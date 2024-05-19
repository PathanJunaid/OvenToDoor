import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import './FooditemsOrder.css'
const FooditemsOrder = ({ Orders_Details }) => {
    const { food_list } = useContext(StoreContext);

    const [items, setitems] = useState([]);
    const [id, setid] = useState(useParams().id)
    // const []
    let total_amount = 0;
    useEffect(() => {
        try {
            const order = Orders_Details.find((ele) => ele.Order_id === id);
            if (order) {
                setitems(order.Items_id);
            }
            console.log(order)

        } catch (e) {

        }
    }, [Orders_Details, id]);
    return (
        <>

            {
                items !== undefined ? items.map((ele) => {
                    total_amount += ele.quantity * food_list[ele.Pizza_id - 1].Price;
                    return (

                        <div className='food-item-order' key={ele.Pizza_id}>
                            <div className="food-item-img-container-order">
                                <img className='food-item-image-order' src={food_list[ele.Pizza_id - 1].Image} alt='' />
                            </div>
                            <div className="food-item-info-order">
                                <div className="food-item-name-rating-order">
                                    <p>{food_list[ele.Pizza_id - 1].Pizza_Name}</p>
                                    {/* <img src={assets.rating_starts} alt="" /> */}
                                </div>
                                <p className="food-item-desc-order">
                                    {food_list[ele.Pizza_id - 1].Description}
                                </p>
                                <p className="food-item-price-order">
                                    Rs.{food_list[ele.Pizza_id - 1].Price}/-
                                </p>
                            </div>
                            <div className='item-Quantity-order'>
                                <p>{ele.quantity}</p>
                            </div>
                            <div>
                                <p>Rs.{ele.quantity * food_list[ele.Pizza_id - 1].Price}/-</p>

                            </div>
                        </div>
                    )
                })


                    : ""
            }
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

                        Rs.{total_amount}/-
                    </h3>

                </div>
            </div>
        </>
    )
}

export default FooditemsOrder