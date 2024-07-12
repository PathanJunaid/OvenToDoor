import mongoose, { Schema } from "mongoose";

const Add_to_cart_Schema = new mongoose.Schema({
    Dish_Id: {
        type: String,
    },
    quantity: { type: Number, default: 1 },
    Delivered: { type: Boolean, default: false },
})
const Address = new mongoose.Schema({
    Name: {
        type: String,
    },
    Mobile_No:{
        type:Number,
    },
    House_No:{
        type:String,
    },
    Area:{
        type:String
    },
    City:{
        type:String
    },
    PIN : {
        type :Number,
    }
})

// export const Add_to_Cart_Connect = mongoose.model('carts',Add_to_cart_Schema);

const User_Schema = new mongoose.Schema({
    User_Name: {
        type: String,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Admin: {
        type: Boolean,
        default: false
    },
    Cart: {
        type: [Add_to_cart_Schema],
    },
    Address: {
        type: [Address],
    },
    // Seesion_id: {
    //     type: String,
    // },
    // Mobile_No: {
    //     type: Number,

    // },
    createdAt: { type: Date, default: Date.now },
})
export const User_Connect = mongoose.model('Userdata', User_Schema);

const Order_Schema = new mongoose.Schema({
    Order_id: {
        type: String,
        required: true,
        unique: true
    },
    Payment_id:{
        type:String,
        required:true,
        unique:true
    },
    User_id: {
        type: String,
        required: true,
    },
    Items_id: {
        type: Array,
        required: true,
    },
    Payment_of: {
        type: Number,
        required: true,
    },
    Address:{
        type: Address,
    },
    Status: {
        type: String,
        required: true,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
})
export const Order_Details_Connect = mongoose.model('Order_Details', Order_Schema);
const OTP_Schema = new mongoose.Schema({
    OTP: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true,
    }
});
export const OTP_Connect = mongoose.model('OTP', OTP_Schema);

// Status Values 
// wait => Notification send to Admin waiting to confirm order
// Confirmed=> Order Confirmed
// Dispatch => Order Dispathced
// Delivered => Order Delivered

const Notification_Schema = new mongoose.Schema({
    Order_id:{
        type :Schema.Types.ObjectId,
        ref:'Order_Details',
        required:true,
        unique:true,
    },
    User_Name:{
        type : String,
        required:true,
    },
    User_id:{
        type : Schema.Types.ObjectId,
        ref:'Userdata',
        required:true
    },
    Status:{
        type:String,
        default: "waiting"
    },
    createdAt:{
        type : Date,
        default:Date.now,
    }
})
export const  Notification_Connect = new mongoose.model('Notification',Notification_Schema)
const Admin_Schema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Restaurant: {
        type: String,
        required: true
    },
    Admin: {
        type: Boolean,
        required: true,
        default: false
    },
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    },
    Notification: {
        type: [],
    }
});
export const Admin_Connect = mongoose.model('Admin', Admin_Schema);
