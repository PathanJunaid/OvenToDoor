import { Add_Pizza_Db } from "../Mongodb/Pizza_Schema.js";
import fs from 'fs'


// Adding New Pizza to database 
export const AddPizza = async (req, res) => {
    // values form request 
    const { Pizza_Name, Veg, Price, Description, Is_Small, Is_Medium, Is_Large, Small_Price, Medium_Price, Large_Price } = req.body;
    // New file name stored in local Storage 
    const { path } = req.file;
    // Craeting new Pizza Id 
    const Pizza_id = "MN" + Date.now();
    // response 
    let Message;
    // Size and crust Information as this is a schema 
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
    // Inserting Data 
    const Pizza = await Add_Pizza_Db.create({
        Pizza_id, Pizza_Name, Veg, Price, Description, sizeandcrust, Image: path
    }).then((res) => { return res }).catch((e) => { return false });
    // Sendind response 
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
    // Pizza id from params 
    const { Pizza_id } = req.params;
    // If Admin want to change file also then 
    if (req.file) {
        // Fetching Pizza details of Pizza_id 
        const Pizza_detail = await Add_Pizza_Db.findOne({ Pizza_id }).then().catch((e) => { return false }) 
        const existingImagePath = Pizza_detail.Image; // Provide the actual path of existing image
        // Deleteing file form Storage 
        fs.unlink(existingImagePath, (err) => {
            if (err) {
                console.error('Error deleting existing image:', err);
            }
        });
        // updating new file location to database 
        await Add_Pizza_Db.findOneAndUpdate({ Pizza_id }, {
           Image:req.file.path}).then((res) => { return res }).catch((e) => { console.log(e); return false });

    }
    // Updating text 
    let Message;
    // text values 
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
    // Updating text to database 
    const Pizza = await Add_Pizza_Db.findOneAndUpdate({ Pizza_id }, {
        Pizza_Name, Veg, Price, Description, sizeandcrust, updated_at: Date.now()
    }).then((res) => { return res }).catch((e) => { console.log(e); return false });
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
    const { Pizza_id } = req.params;
    // response variable 
    let Message = "";
    // Finding and deleting Pizza 
    const Pizza = await Add_Pizza_Db.findOneAndDelete({ Pizza_id }).then((response) => { return response }).catch((e) => { return false })
    // Sending reposne 
    if (Pizza) {
        Message = {
            status: true,
            msg: `${Pizza.Pizza_Name} removed from menu`
        }
    } else {
        Message = {
            status: false,
            msg: `Unable to Delete`
        }
    }
    res.send(Message);
}