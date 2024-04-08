import { measureMemory } from "vm";
import { Add_Pizza_Db } from "../Mongodb/Pizza_Schema.js";


export const AddPizza = async (req, res) => {
    const { Pizza_Name, Veg, Price, Description, Is_Small, Is_Medium, Is_Large, Small_Price, Medium_Price, Large_Price } = req.body;
    const { path } = req.file;
    const Pizza_id = "MN" + Date.now();
    let Message;
    const sizeandcrust = {
        Small: {
            Price: Small_Price,
            Available: Is_Small
        },
        Medium: {
            Price: Medium_Price,
            Available: Is_Medium
        },
        Large: {
            Price: Large_Price,
            Available: Is_Large
        },
    }
    const Pizza = await Add_Pizza_Db.create({
        Pizza_id, Pizza_Name, Veg, Price, Description, sizeandcrust, Image: path
    }).then((res) => { return res }).catch((e) => { return false });
    if (Pizza) {
        Message = {
            Status: true,
            Msg: "Pizza Added to Menu",
        }
    } else {
        Message = {
            msg: `${Pizza_Name} Already in menu.`,
            Status: false,
        }
    }
    res.send(Message);
}

export const Edit_item = async (req, res) => {
    const { Pizza_id } = req.params;
    let Message;
    const { Pizza_Name, Veg, Price, Description, Is_Small, Is_Medium, Is_Large, Small_Price, Medium_Price, Large_Price } = req.body;
    const sizeandcrust = {
        Small: {
            Price: Small_Price,
            Available: Is_Small
        },
        Medium: {
            Price: Medium_Price,
            Available: Is_Medium
        },
        Large: {
            Price: Large_Price,
            Available: Is_Large
        },
    }
    const Pizza = await Add_Pizza_Db.findOneAndUpdate({ Pizza_id }, {
        Pizza_Name, Veg, Price, Description, sizeandcrust,updated_at:Date.now()
    }).then((res) => { return res }).catch((e) => { console.log(e); return false });
    // console.log(Pizza)
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

export const Delete_Item = async (req,res)=>{
    const {Pizza_id} = req.params;
    let Message = "";
    const Pizza  = await Add_Pizza_Db.findOneAndDelete({Pizza_id}).then((response)=>{return response}).catch((e)=>{return false})
    if(Pizza){
        Message= {
            status:true,
            msg: `${Pizza.Pizza_Name} removed from menu`
        }
    }else{
        Message= {
            status:false,
            msg: `Unable to Delete`
        }
    }
    res.send(Message);
}