'use strict'
import express from "express"
import { AdminAddDelivaryPartner, AdminAuthenticated, AdminLogin, AdminLogout, AdminPreviousOrder, AdminRegister, AdminUpdateLocation } from "../Controllers/Admin_Auth_Controller.js";
import  upload  from "../Middleware/Multer.js";
import { AddPizza, AdminMenu, Delete_Item, Edit_item } from "../Controllers/Admin_Controller.js";
const Admin_Routes = express.Router();

Admin_Routes.post('/Admin/Register', AdminRegister);
Admin_Routes.post('/Admin/login', AdminLogin);
Admin_Routes.post('/Admin/logout', AdminLogout);
Admin_Routes.post('/Admin/orders',AdminAuthenticated,AdminPreviousOrder);
Admin_Routes.post('/Admin/Menu',AdminAuthenticated,AdminMenu);
// Pending 
Admin_Routes.put('/Admin/Update/Location',AdminUpdateLocation);
// Pending 
// Admin_Routes.post('/Admin/AddDeliveryPartner',AdminAuthenticated,AdminAddDelivaryPartner);
// Admin add Pizza to menu 
Admin_Routes.post('/Admin/NewPizza',upload.single("Image"),AddPizza);
Admin_Routes.post(`/Admin/Edit_Item/:_id`,upload.single('Image'),Edit_item);
Admin_Routes.delete('/Admin/Delete_Item/:_id',Delete_Item)
export default Admin_Routes;