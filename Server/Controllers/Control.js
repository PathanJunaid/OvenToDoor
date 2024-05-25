import jwt from 'jsonwebtoken';
import { Order_Details_Connect, User_Connect } from '../Mongodb/Schema.js';
import { Add_Pizza_Db } from '../Mongodb/Pizza_Schema.js';

export const cartitems = async (req,res)=>{
    // finding if logged in or not 
    const jwt_token = req.cookies[process.env.cookiename];
    let error = false
    // decoding user id using jwt token from cookie 
    const id = jwt.verify(jwt_token, process.env.jwtsecrettoken, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
            error = true;
        } else {
            return decoded.id

        }
    });
    // Getting user info using id 
    const user = await User_Connect.findById(id).then((res)=>{
        return res
    }).catch((e)=>{console.log(e);error=false})
    // checking if pizza already in cart 
    const Cart_data = user.Cart;
    const response = {
        data : Cart_data,
        auth:true,
        error
    }
    res.send(response);
}
export const Address = async (req,res)=>{
    // finding if logged in or not 
    const jwt_token = req.cookies[process.env.cookiename];
    let error = false
    // decoding user id using jwt token from cookie 
    const id = jwt.verify(jwt_token, process.env.jwtsecrettoken, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
            error = true;
        } else {
            return decoded.id

        }
    });
    // Getting user info using id 
    const user = await User_Connect.findById(id).then((res)=>{
        return res
    }).catch((e)=>{console.log(e);error=false})
    // checking if pizza already in cart 
    const Addresses = user.Address;
    const response = {
        data : Addresses,
        auth:true,
        error
    }
    res.send(response);
}


export const Addtocart = async (req, res) => {
    // Getting unique Pizza  id 
    const { Pizza_id } = req.body;
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
    console.log(Pizza_id)
    // checking if pizza already in cart 
    const Cart_data = user.Cart;
    const isPizza = Cart_data.find(ele => {
        return ele.Pizza_id == Pizza_id;
    })
    // item was not in cart i.e  new item 
    if (!isPizza) {
        await User_Connect.findByIdAndUpdate(user.id, {
            Cart: [...user.Cart, {
                Pizza_id: Pizza_id,
                quantity: 1,
            }]
        }).then((res) => {
            return;
        }).catch((er) => {
            // error = er;
            return;
        })
    } 
    // item was already in cart only need to increase the quantity 
    else {
        const updatedUser = await User_Connect.findOneAndUpdate({_id:user._id, 'Cart.Pizza_id': Pizza_id },
            { 'Cart.$.quantity': isPizza.quantity + 1 }
        ).then((res)).catch((err) => {
            // error = err;
        })
        res.send("Updated")
        return;
    }
    res.send("Added to cart");
}




export const removeitem_cart = async (req, res) => {
    const { Pizza_id } = req.body;
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
    // Finding specific Pizza id in cart 
    const isPizza = user.Cart.find(ele => {
        return ele.Pizza_id == Pizza_id;
    });
    console.log()
    if (isPizza) {
        // quantity of item is less than 1
        if (isPizza.quantity <= 1) {
            const updatedCart = user.Cart.filter(item => {
                return item.Pizza_id !== parseInt(Pizza_id)
            });
            const us = await User_Connect.findByIdAndUpdate(user.id, { Cart: updatedCart });
        } 
        // quantity of item is greater than 1
        else {
            const updatedUser = await User_Connect.findOneAndUpdate({ 'Cart.Pizza_id': Pizza_id },
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
    let error = false;
    const jwt_Token = req.cookies[process.env.cookiename];
    const id = jwt.verify(jwt_Token, process.env.jwtsecrettoken, (err, res) => {
        if (err) {

        } else {
            return res.id;
        }
    });
    const user_Details = await User_Connect.findById(id).then((response) => { return response }).catch((e) => {error = true });
    // console.log(user_Details);
    const User_Orders = await Order_Details_Connect.find({ User_id: user_Details.Email }).then(response => { return response }).catch((e) => { error = true});
    // console.log(User_Orders)
    const response = {
        data : User_Orders,
        auth:true,
        error
    }
    res.send(response);

}




export const ShowPizza = async (req,res)=>{
    const data = await Add_Pizza_Db.find({}).then((res)=>{return res}).catch((e)=>{return "data not found"});
    res.status(200).json(data);
}



// req params contains order id 
export const Specific_Order = async(req,res)=>{
    let response = {
        error:false,
        msg : "Try again later",
        data: ""
    }
    const {id} = req.params
    console.log(id)
    const Order_detail = await Order_Details_Connect.findOne({Order_id:id}).then().catch((e)=>{
        response = {
            error:true,
            msg : "Try Again Later"
        }
    });
    if(!response.error){
        response = {
            error:false,
            msg : "Success",
            data: Order_detail
        }
    }
    res.send(response);
}