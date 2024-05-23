import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './CartItem.css'
import { assets } from '../../assets/assets';
import axios from 'axios';

const CartItem = (Items) => {
    // const { cartItems,setCartItems } = useContext(StoreContext);
    const { cartItems, food_list, addToCart, removeFromCart } = useContext(StoreContext);
    let count = 0;
    let totalamount = 0;
    let Delivery = 30;
    const cartItemsArray = Object.entries(cartItems).map(([key, value]) => {
        totalamount += food_list[key - 1].Price * value;
        return (
            // {console.log(key)}
            <div key={key} className="each_item">
                <div className="items">{count += 1}</div>
                <div className="items">{food_list[key - 1].Pizza_Name}</div>
                <div className="items">&#x20B9; {food_list[key - 1].Price}</div>
                <div className='food-item-counter_cart'>
                    <img onClick={() => removeFromCart(key)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[key]}</p>
                    <img onClick={() => addToCart(key)} src={assets.add_icon_green} alt="" />

                </div>
                <div className="items">
                    &#x20B9; {food_list[key - 1].Price * value}.00
                </div> {/* Accessing Price property from value object */}
            </div>
        )
    }
    );
    let Amount
    if (totalamount > 0) {
        Delivery = 30
        Amount = totalamount + Delivery
    } else {
        Delivery = 0

    }
    const ProceedtoCheckout = async () => {
        const res = await axios.post('http://localhost:4000/payment', { Amount }, { withCredentials: true }).then((res) => {
            console.log(res)
            if (!res.data.error) {
                // window.location.href = res.URL;
                window.location.replace(res.data.URL);
            }
        }).catch((e) => { console.log(e) })
    }
    return (
        <>
            <div className='Cart_items_container'>
                <div className="each_item_header each_item">
                    <div className="items">Item</div>
                    <div className="items">Title</div>
                    <div className="items">Price</div>
                    <div className='items'>Quantity</div>
                    <div className="items">Total</div>
                </div>
                {
                    cartItemsArray.length === 0 ? <h4 className='empty-cart'>
                        No item in cart
                    </h4>
                     : ""
                }

                {cartItemsArray}

            </div>
            {
                Amount > 0 ?

                    <div className="cart_total">
                        <div>
                            <h3>Cart Total</h3>
                        </div>
                        <div className='cart_total_each'>
                            <span>Subtotal</span>
                            <span>{totalamount}</span>
                        </div>
                        <div className='cart_total_each'>
                            <span>Delivery Fee</span>
                            <span>{totalamount > 0 ? Delivery : 0}</span>
                        </div>
                        <div className='cart_total_am'>
                            <span>Total</span>
                            <span>{Delivery + totalamount}</span>
                        </div>
                        <div className=''>
                            <button className='PaymentButton' onClick={(e) => { ProceedtoCheckout() }}>Proceed to Checkout</button>
                        </div>
                    </div>
                    :
                    ""
            }

        </>
    )
}

export default CartItem