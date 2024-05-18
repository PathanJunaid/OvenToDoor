import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = async (Pizza_id) => {
        try {
            const res = await axios.put('http://localhost:4000/addtocart', { Pizza_id }, {withCredentials:true});
            console.log(res);
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

            setCartItems((prev) => ({ ...prev, [Pizza_id]: prev[Pizza_id] - 1 }))
        } catch (e) {
            console.error("Error Occured: ", e);
        }

    }


    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;