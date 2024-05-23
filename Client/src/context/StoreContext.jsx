import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [Orders_Details , setOrders_Details] = useState(null);
    const [Authenticated,setAuthenticated] = useState(false)
    const [Loading,setLoading] = useState(false)
    const addToCart = async (Pizza_id) => {
        try {
            const res = await axios.put('http://localhost:4000/addtocart', { Pizza_id }, {withCredentials:true});
            if(!res.auth && res.status){
                new Error("Not Authenticated");
            }
            setCartItems((prev) => {
                const updatedItems = { ...prev };
                if (!updatedItems[Pizza_id]) {
                    updatedItems[Pizza_id] = 1;
                } else {
                    updatedItems[Pizza_id] += 1;
                }
                return updatedItems;
            });
        } catch (e) {
            console.error("Error Occured: ", e);
        }

    }

    const removeFromCart = async(Pizza_id) => {
        try {
            const res = await axios.put('http://localhost:4000/removeitem', { Pizza_id }, {withCredentials:true});
            console.log(res);

            setCartItems((prev) => ({ ...prev, [Pizza_id]: prev[Pizza_id]>1 ? prev[Pizza_id] - 1 : prev[Pizza_id] = 0}))
        } catch (e) {
            console.error("Error Occured: ", e);
        }

    }


    useEffect(() => {

    }, [cartItems])

    const contextValue = {
        Loading,
        setLoading,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        Orders_Details,
        setOrders_Details,
        Authenticated,
        setAuthenticated
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;