import { Add_Pizza_Db } from "../Mongodb/Pizza_Schema.js";
import fs from 'fs'


// Adding New Pizza to database 
export const AddPizza = async (req, res) => {
    // values form request 
    const {DishName, Category, Description, Ingredients, Price, Discounts, ServingSize, PreparationTime, Availability } = req.body;
    // New file name stored in local Storage 
    const { location } = req.file;
    console.log(Category)
    // Craeting new Pizza Id 
    const Dish_Id = "MN" + Date.now();
    console.log(Dish_Id)
    // response 
    let Message;
    // Inserting Data 
    const Pizza = await Add_Pizza_Db.create({
        Dish_Id,DishName, Category, Description, Ingredients, Price, Discounts, ServingSize, PreparationTime, Availability,Image:location
    }).then((res) => { return res }).catch((e) => { console.log(e);return false });
    console.log(Pizza)
    // Sendind response 
    if (Pizza) {
        Message = {
            Status: true,
            msg: `${DishName} Added to Menu`,
        }
    } else {
        Message = {
            msg: `${DishName} Already in menu.`,
            Status: false,
        }
    }
    res.send(Message);
}

export const Edit_item = async (req, res) => {
    // Pizza id from params 
    const { _id } = req.params;
    // If Admin want to change file also then 
    if (req.file) {
        // Fetching Pizza details of Pizza_id 
        const Pizza_detail = await Add_Pizza_Db.findById( _id ).then().catch((e) => { return false }) 
        console.log(Pizza_detail);
        const existingImagePath = Pizza_detail.Image; // Provide the actual path of existing image
        // Deleteing file form Storage 
        fs.unlink(existingImagePath, (err) => {
            if (err) {
                console.error('Error deleting existing image:', err);
            }
        });
        // updating new file location to database 
        await Add_Pizza_Db.findByIdAndUpdate( _id , {
           Image:req.file.location}).then((res) => { return res }).catch((e) => { console.log(e); return false });

    }
    // Updating text 
    let Message;
    // text values 
    const { DishName, Category, Description, Ingredients, Price, Discounts, ServingSize, PreparationTime, Availability } = req.body;
    // Updating text to database 
    const Pizza = await Add_Pizza_Db.findByIdAndUpdate( _id , {
        DishName, Category, Description, Ingredients, Price, Discounts, ServingSize, PreparationTime, Availability, updated_at: Date.now()
    }).then((res) => { return res }).catch((e) => { console.log(e); return false });
    // console.log(Pizza)
    // Sending response 
    if (Pizza) {
        Message = {
            Status: true,
            Msg: "Value Updated",
        }
    } else {
        Message = {
            Status: false,
            Msg: "Unknown error Occured",
        }
    }
    res.send(Message);
}

// Delete item Fucntion 
export const Delete_Item = async (req, res) => {
    // Pizza id from Params 
    const { _id } = req.params;
    // response variable 
    console.log(_id)
    let Message = "";
    // Finding and deleting Pizza 
    const Pizza = await Add_Pizza_Db.findByIdAndDelete(_id).then((response) => { return response }).catch((e) => { return false })
    // Sending reposne
    console.log(Pizza) 
    if (Pizza) {
        Message = {
            status: true,
            msg: `${Pizza.DishName} removed from menu`
        }
    } else {
        Message = {
            status: false,
            msg: `Unable to Delete`
        }
    }
    res.send(Message);
}

export const AdminMenu = async(req,res)=>{
    let status=false
    const data = await Add_Pizza_Db.find({}).then((res)=>{
        status=true;
        return res
    }).catch((e)=>{
        console.log("Unable to Fetch Menu" + "\n" + e);
    })
    res.send({
        auth:true,
        status,
        data
    })
}