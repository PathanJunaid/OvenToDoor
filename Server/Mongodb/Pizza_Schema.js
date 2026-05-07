import mongoose from 'mongoose';
import { type } from 'os';
const Subcat = new mongoose.Schema({
    Price:{
        type:Number,
        required:true,
        default:0,
    },
    Available:{
        type:Boolean,
        required:true,
        default:false,
    }
})
const Add_New_Pizza_Schema = new mongoose.Schema({
    Dish_Id : {
        type:String,
        required:true,
        unique : true
    },
    DishName: {
        type:String,
        required: true,
        unique:true
    },
    Ingredients: {
        type:String,
        required: true,
        // unique:true
    },
    Discounts: {
        type:String,
        // unique:true
    },
    PreparationTime: {
        type:String,
        required: true,
        // unique:true
    },

    Category : {
        type:String,
        required:true,
    },
    Price : {
        type:Number,
        required:true,
    },
    Description : {
        type:String,
        required:true,
    },
    Image : {
        type:String,
        required:true,
    },
    Availability : {
        type:String,
        // required:true,
    },
    ServingSize:{
        type:Number,
        required: true
    },
    created_at : {
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    }
})
export const Add_Pizza_Db = mongoose.model('Pizza',Add_New_Pizza_Schema);