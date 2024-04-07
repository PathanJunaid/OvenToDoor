import mongoose from 'mongoose';
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
const Size = new mongoose.Schema({
    Small : {
        type : Subcat,
        // default:true,
    },
    Medium : {
        type:Subcat,
        // default:true,
    },
    Large : {
        type:Subcat,
        // default:true,
    }
});
const Add_New_Pizza_Schema = new mongoose.Schema({
    Pizza_id: {
        type:String,
        required:true,
    },
    Pizza_Name: {
        type:String,
        required: true,
    },
    Veg : {
        type:Boolean,
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
    sizeandcrust : {
        type: [Size],
        required:true
    },
})
export const Add_Pizza_Db = mongoose.model('Pizza',Add_New_Pizza_Schema);