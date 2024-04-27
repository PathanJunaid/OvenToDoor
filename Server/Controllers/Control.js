import jwt from 'jsonwebtoken';
import { Order_Details_Connect, User_Connect } from '../Mongodb/Schema.js';
import { Add_Pizza_Db } from '../Mongodb/Pizza_Schema.js';

export const Addtocart = async (req, res) => {
    // Getting unique Pizza  id 
    const { pizza_id } = req.body;
    // finding if logged in or not 
    const jwt_token = req.cookies[process.env.cookiename];

    // decoding user id using jwt token from cookie 
    const id = jwt.verify(jwt_token, process.env.jwtsecrettoken, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
        } else {
            return decoded.id
        }
    });
    // Getting user info using id 
    const user = await User_Connect.findById(id).then().catch((e)=>{console.log(e)})
    // checking if pizza already in cart 
    const Cart_data = user.Cart;
    const isPizza = Cart_data.find(ele => {
        return ele.Pizza_id == pizza_id;
    })
    if (!isPizza) {
        await User_Connect.findByIdAndUpdate(user.id, {
            Cart: [...user.Cart, {
                Pizza_id: pizza_id,
                quantity: 1,
            }]
        }).then((res) => {
            return;
        }).catch((er) => {
            error = er;
            return;
        })
    } else {
        const updatedUser = await User_Connect.findOneAndUpdate({ 'Cart.Pizza_id': pizza_id },
            { 'Cart.$.quantity': isPizza.quantity + 1 }
        ).then((res)).catch((err) => {
            error = err;
        })
        res.send("Updated")
        return;
    }
    res.send("Added to cart");
}




export const removeitem_cart = async (req, res) => {
    const { pizza_id } = req.body;
    // console.log(typeof(pizza_id));
    // finding if logged in or not 
    const jwt_token = req.cookies[process.env.cookiename];

    // decoding user id using jwt token from cookie 
    const id = jwt.verify(jwt_token, process.env.jwtsecrettoken, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
        } else {
            return decoded.id
        }
    });
    // Getting user info using id 
    const user = await User_Connect.findById(id).then((response) => {
        return response
    }).catch((e) => {
        console.log("error" + e)
    });
    const isPizza = user.Cart.find(ele => {
        return ele.Pizza_id == pizza_id;
    });
    if (isPizza) {
        if (isPizza.quantity <= 1) {
            const updatedCart = user.Cart.filter(item => {
                return item.Pizza_id !== parseInt(pizza_id)
            });
            const us = await User_Connect.findByIdAndUpdate(user.id, { Cart: updatedCart });
        } 
        else {
            const updatedUser = await User_Connect.findOneAndUpdate({ 'Cart.Pizza_id': pizza_id },
                { 'Cart.$.quantity': isPizza.quantity - 1 }
            ).then((res)).catch((err) => {
                return;
            })
            res.send("Deleted")
            return;
        }
    } else {
        res.send("Item not in cart")
        return
    }
    res.send("Updated")
}



export const User_PreviousOrder = async (req, res) => {
    const jwt_Token = req.cookies[process.env.cookiename];
    const id = jwt.verify(jwt_Token, process.env.jwtsecrettoken, (err, res) => {
        if (err) {

        } else {
            return res.id;
        }
    });
    const user_Details = await User_Connect.findById(id).then((response) => { return response }).catch((e) => { });
    // console.log(user_Details);
    const User_Orders = await Order_Details_Connect.find({ User_Email: user_Details.Email }).then(response => { return response }).catch((e) => { });
    res.send(User_Orders);

}




export const ShowPizza = async (req,res)=>{
    const data = await Add_Pizza_Db.find({}).then((res)=>{return res}).catch((e)=>{return "data not found"});
    res.status(200).send(data);
}