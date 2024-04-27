import Razorpay from 'razorpay'
import jwt from 'jsonwebtoken'
import { Order_Details_Connect, User_Connect } from '../Mongodb/Schema.js';
export const Payment = async (req, res) => {
    const {Amount} = req.body;
    var response = {
        error:false,
        msg:"",
        URL:""
    }
    let total =Amount+"00";
    // console.log(typeof(Amount))
    var instance = new Razorpay({ key_id: process.env.key, key_secret: process.env.secret })
    // finding if logged in or not 
    const jwt_token = req.cookies[process.env.cookiename];

    // decoding user id using jwt token from cookie 
    const id = jwt.verify(jwt_token, process.env.jwtsecrettoken, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
            response = {
                error:true,
                msg:"Error decoding token i.e JWT"
            }
        } else {
            return decoded.id
        }
    });
    // Getting user info using id 
    const user = await User_Connect.findById(id).then().catch((e)=>{
        response = {
            error:true,
            msg:"User not found"
        }
    })
    // checking if pizza already in cart 
    const Cart_data = user.Cart;
    const data = await instance.paymentLink.create({
        amount: parseInt(total),
        currency: "INR",
        accept_partial: false,
        description: "Pizza Order",
        customer: {
            name: user.User_Name ,
            email: user.Email,
            contact: `+91${user.Mobile_No}`
        },
        notify: {
            sms: true,
            email: true
        },
        reminder_enable: true,
        notes: {
            policy_name: "Pizza Order"
        },
        callback_url: "http://localhost:4000/payment/status",
        callback_method: "get"
    }).then().catch((e) => { 
        console.log(e)
        response = {
            error:true,
            msg: e.error.description
        }
     })
     if(response.error){
        res.send(response);
        return 
     }
    //Update to database 
    try{
        const Order = await Order_Details_Connect.create({
            Order_id:data.id,
            User_id:user.Email,
            Items_id: Cart_data,
            Payment_of:Amount,
            Status:false,
        })

    }catch{
        response = {
            error:true,
            msg: "Order not added to database"
        }
    }
    try{
        if (!data.error) {
            response = {
                error:false,
                msg: "Link Created",
                URL:data.short_url
            }
            console.log(response)
            res.send(response);
        }

    }catch{
        res.send(response)
    }
    // res.send(data)
}
export const PaymentStatus = async (req, res) => {
    let response = {
        error : false,
        msg: ""
    }
    // pending  Update to database 
    const update_order = await Order_Details_Connect.findOneAndUpdate({Order_id:req.query.razorpay_payment_link_id},{Status:req.query.razorpay_payment_link_status}).then().catch((e)=>{
        console.log(e)
        response = {
            error : true,
            msg: "Unable to update order"
        }
    })
    console.log(response)
    if(response.error){
        res.send(response)
        return
    }
    //pending Update admin regrading the order 

    // front end order page 
    res.redirect('http://localhost:3000/orders')
    // redirect to order page 
}