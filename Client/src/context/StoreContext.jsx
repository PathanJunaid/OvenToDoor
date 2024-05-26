import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [Orders_Details , setOrders_Details] = useState(null);
    const [Address , setAddress] = useState(null);
    const [Authenticated,setAuthenticated] = useState(false)
    const [Loading,setLoading] = useState(false)
    const addToCart = async (Pizza_id) => {
        try {
            const res = await axios.put('http://localhost:4000/addtocart', { Pizza_id }, {withCredentials:true}).then((res)=>{
                setCartItems((prev) => {
                    const updatedItems = { ...prev };
                    if (!updatedItems[Pizza_id]) {
                        updatedItems[Pizza_id] = 1;
                    }else{
                        updatedItems[Pizza_id] += 1;
                    }
                    return updatedItems;
                });
                return res;
            });
            if(!res.auth && res.status){
                new Error("Not Authenticated");
            }
        } catch (e) {
            console.error("Error Occured: ", e);
        }

    }

    const removeFromCart = async(Pizza_id) => {
        try {
            const res = await axios.put('http://localhost:4000/removeitem', { Pizza_id }, {withCredentials:true});
            // console.log(res);

            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[Pizza_id] > 1) {
                    updatedCart[Pizza_id] -= 1;
                } else {
                    delete updatedCart[Pizza_id];
                }
                return updatedCart;
            });
        } catch (e) {
            console.error("Error Occured: ", e);
        }
    }


    useEffect(() => {

    }, [cartItems])

    const contextValue = {
        Address,
        setAddress,
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