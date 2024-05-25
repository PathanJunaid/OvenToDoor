import express from "express";
import { ForgetPassword, Login_Cont, Logout_control, Sign_Cont, User_Authenticated, ValidateOTP } from "../Controllers/Auth_control.js";
import { Add_Address, Address, Addtocart, ShowPizza, Specific_Order, User_PreviousOrder, cartitems, removeitem_cart } from "../Controllers/Control.js";
import { Payment, PaymentStatus } from "../Controllers/Payment.js";
const User_routes = express.Router();
// Login route 
User_routes.post('/login', Login_Cont);
// Register Route 
User_routes.post('/Signup', Sign_Cont);
// Forget Password route {Send OTP to User mail}
User_routes.post('/forgetpassword', ForgetPassword);
// validating user OTP 
User_routes.post('/ValidateOTP', ValidateOTP);
// Logout Route 
User_routes.post('/logout', Logout_control)
// Check out route 
// User_routes.post('/Payment',)
// Show Address 
User_routes.post('/Address',User_Authenticated,Address);
// Adding new address 
User_routes.post('/Add/Address',User_Authenticated,Add_Address)
// Show Cart 
User_routes.post('/cartitems',User_Authenticated,cartitems)
// Addt to Cart Route 
User_routes.put('/addtocart',User_Authenticated, Addtocart);

// remove from cart 
User_routes.put('/removeitem', User_Authenticated, removeitem_cart)
// Orders route
// Previous orders 
User_routes.post('/Orders', User_Authenticated, User_PreviousOrder);
// Specific_Order 
User_routes.post('/Orders/:id',User_Authenticated,Specific_Order)
// Completed 
User_routes.post('/payment',User_Authenticated,Payment)
User_routes.get('/payment/status/:id',PaymentStatus)
// Pending 
User_routes.get('/ShowPizza', ShowPizza)

export default User_routes;