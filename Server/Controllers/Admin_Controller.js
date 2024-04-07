import { Add_Pizza_Db } from "../Mongodb/Pizza_Schema.js";


export const AddPizza = async(req,res)=>{
    const {Pizza_id,Pizza_Name,Veg,Price,Description,Is_Small,Is_Medium,Is_Large,Small_Price,Medium_Price,Large_Price} = req.body;
    const {path} = req.file;
    console.log(req.file)
    const sizeandcrust = {
        Small: {
            Price:Small_Price,
            Available:Is_Small
        },
        Medium:{
            Price:Medium_Price,
            Available:Is_Medium
        },
        Large:{
            Price:Large_Price,
            Available:Is_Large
        },
    }
    const Pizza = await Add_Pizza_Db.create({
        Pizza_id,Pizza_Name,Veg,Price,Description,sizeandcrust,Image:path
}).then((res)=>{return res}).catch((e)=>{console.log(e)});
    console.log(Pizza)
    res.send("Add_Pizza");
}