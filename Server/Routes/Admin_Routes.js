'use strict'
import express from "express"
import { AdminAddDelivaryPartner, AdminAuthenticated, AdminLogin, AdminLogout, AdminPreviousOrder, AdminRegister, AdminUpdateLocation } from "../Controllers/Admin_Auth_Controller.js";
import { upload } from "../Middleware/Multer.js";
import { AddPizza, Delete_Item, Edit_item } from "../Controllers/Admin_Controller.js";
const Admin_Routes = express.Router();

Admin_Routes.post('/Admin/Register', AdminRegister);
Admin_Routes.post('/Admin/login', AdminLogin);
Admin_Routes.post('/Admin/logout', AdminLogout);
Admin_Routes.post('/Admin/Showcart',AdminAuthenticated,AdminPreviousOrder);
// Pending 
Admin_Routes.put('/Admin/Update/Location',AdminUpdateLocation);
// Pending 
// Admin_Routes.post('/Admin/AddDeliveryPartner',AdminAuthenticated,AdminAddDelivaryPartner);
// Admin add Pizza to menu 
Admin_Routes.post('/Admin/NewPizza',upload.single("file"),AddPizza);
Admin_Routes.put(`/Admin/Edit_Item/:Pizza_id`,upload.single('file'),Edit_item);
Admin_Routes.delete('/Admin/Delete_Item/:Pizza_id',Delete_Item)
export default Admin_Routes;