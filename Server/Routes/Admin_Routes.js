import express from "express"
import { AddPizza, AdminAddDelivaryPartner, AdminAuthenticated, AdminLogin, AdminLogout, AdminPreviousOrder, AdminRegister, AdminUpdateLocation } from "../Controllers/Admin_Controller.js";
import { upload } from "../Middleware/Multer.js";
const Admin_Routes = express.Router();

Admin_Routes.post('/Admin/Register', AdminRegister);
Admin_Routes.post('/Admin/login', AdminLogin);
Admin_Routes.post('/Admin/logout', AdminLogout);
Admin_Routes.post('/Admin/Showcart',AdminAuthenticated,AdminPreviousOrder);
Admin_Routes.put('/Admin/Update/Location',AdminUpdateLocation);
Admin_Routes.post('/Admin/AddDeliveryPartner',AdminAuthenticated,AdminAddDelivaryPartner);
Admin_Routes.post('/Admin/NewDish/Upload',upload.single("file"),AddPizza)
export default Admin_Routes;