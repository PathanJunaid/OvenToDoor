import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [Orders_Details, setOrders_Details] = useState([]);
    const [Address, setAddress] = useState(null);
    const [Authenticated, setAuthenticated] = useState(false)
    const [Loading, setLoading] = useState(true);
    const [Food_List, setFood_List] = useState([]);
    const addToCart = async (Dish_Id) => {
        try {
            const res = await axios.put('http://localhost:4000/addtocart', { Dish_Id }, { withCredentials: true }).then((res) => {
                setCartItems((prev) => {
                    const updatedItems = { ...prev };
                    if (!updatedItems[Dish_Id]) {
                        updatedItems[Dish_Id] = 1;
                    } else {
                        updatedItems[Dish_Id] += 1;
                    }
                    return updatedItems;
                });
                return res;
            });
            if (!res.auth && res.status) {
                new Error("Not Authenticated");
            }
        } catch (e) {
            console.error("Error Occured: ", e);
        }

    }

    const removeFromCart = async (Dish_Id) => {
        try {
            await axios.put('http://localhost:4000/removeitem', { Dish_Id }, { withCredentials: true });
            // console.log(res);

            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[Dish_Id] > 1) {
                    updatedCart[Dish_Id] -= 1;
                } else {
                    delete updatedCart[Dish_Id];
                }
                return updatedCart;
            });
        } catch (e) {
            console.error("Error Occured: ", e);
        }
    }
    const fetchFood_List = async () => {
        await axios.post('http://localhost:4000/ShowMenu').then((res) => {
            if (res.data.status) {
                setFood_List(res.data.data);

            } else {
                console.log("Can't Store food_List");
            }
            return res.data;
        }).catch((e) => {
            console.log(e);
        })
        setLoading(false)
    }
    const fetchcartitems = async () => {
        const res = await axios.post('http://localhost:4000/cartitems', {}, { withCredentials: true }).then((res) => { return res.data }).catch((e) => { });
        if ((!res.code || res.auth) && res.data.length !== undefined) {
            // console.log(res.data)
            const transformData = () => {
                return res.data.reduce((acc, item) => {
                    // Convert Pizza_id to string to ensure it works as a key in Mongoose Map
                    acc[item.Dish_Id] = item.quantity;
                    return acc;
                }, {});
            };
            setCartItems(transformData);
        }
    }
    const fetchOrdersdetails = async () => {
        try {
            const response = await axios.post('http://localhost:4000/Orders', {}, { withCredentials: true });
            setOrders_Details(response.data.data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))); // Assuming response.data is the array of orders
            // console.log(response.data)
            if (response.data.auth) {
                setAuthenticated(true);
                return;
            } else {
                return
            }
        } catch (e) {
        }
    }
    const fetchAddressdetails = async () => {
        try {
            const response = await axios.post('http://localhost:4000/Address', {}, { withCredentials: true });
            // console.log(response.data.data)
            setAddress(response.data.data); // Assuming response.data is the array of orders
            // console.log(response.data)
        } catch (e) {
        }
    }
    useEffect(() => {

    }, [cartItems])

    const contextValue = {
        Address,
        fetchcartitems,
        fetchOrdersdetails,
        fetchAddressdetails,
        setAddress,
        Loading,
        setLoading,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        Orders_Details,
        setOrders_Details,
        Authenticated,
        setAuthenticated,
        fetchFood_List, Food_List,
        setFood_List
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;