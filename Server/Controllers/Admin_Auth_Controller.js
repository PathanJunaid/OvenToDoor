import { Admin_Connect, Order_Details_Connect } from "../Mongodb/Schema.js";
import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {io} from '../server.js'
export const AdminAuthenticated = async (req, res, next) => {
    let response = {
        error: false,
        msg: "Inavlid request",
        data: [],
        auth: false
    }
    try {
        const Cookie_Value = req.cookies[process.env.AdminCookie];
        const id = jwt.verify(Cookie_Value, process.env.jwtsecrettoken, (err, res) => {
            if (err) {

            } else {
                return res.id;
            }
        });
        const Admin_Details = await Admin_Connect.findById(id).then().catch((e) => {
            response = {
                error: true,
                msg: "Admin not found",
                data: [],
                auth: false
            }
        });
        if (!Admin_Details) {
            res.send(response);
            return;
        }
        next();

    } catch (e) {
        res.send({
            error: true,
            msg: "Admin not found",
            data: [],
            auth: false
        });
    }
}
export const AdminRegister = async (req, res) => {
    const { Email, Restaurant, Password, Latitude, Longitude } = req.body;
    const isAdmin = await Admin_Connect.findOne({ Admin: true }).then().catch((e) => {
        res.send("Try Again");
        return;
    });
    if (isAdmin) {
        res.send("Admin Exist");
        return;
    }
    const HashedPassword = await brcypt.hash(Password, 8)
    // console.log(HashedPassword)
    const Admin = await Admin_Connect.create({
        Email, Restaurant, Password: HashedPassword, Latitude, Longitude, Admin: true
    });
    if (Admin) {
        res.send("Admin Created");
    }
}
export const AdminLogin = async (req, res) => {
    const { Email, Password } = req.body;
    let response = {
        error: false,
        msg: "Login Successfully",
        data: "",
        auth: false
    }
    const isAdmin = await Admin_Connect.findOne({ Email: Email }).then().catch((e) => {
        response.error = true;
        response.msg = "Invalid Admin Email";
        return
    });
    if (!isAdmin) {
        console.log(isAdmin);
        response.error = true;
        response.msg = "Invalid Admin Email";
        res.send(response);
        return;
    }
    const Comparepass = brcypt.compareSync(Password, isAdmin.Password);
    console.log(Comparepass)
    if (!Comparepass) {
        response.msg = "Wrong Password";
        response.error = true
        res.send(response);
        return;
    } else {
        const jwtToken = jwt.sign({ id: isAdmin._id }, process.env.jwtsecrettoken);
        res.cookie(process.env.AdminCookie, jwtToken, { maxAge: 6000000, httpOnly: false });
        response.error ? response.auth = false : response.auth = true;
        res.send(response);

    }
}
export const AdminLogout = async (req, res) => {
    const Admincookies = req.cookies[process.env.AdminCookie];
    let response = {
        error: false,
        msg: "Logged out Successfully",
        data: "",
        auth: false
    }
    if (Admincookies) {
        try {
            // const value = cookies.substr(cookies.indexOf("=") + 1, cookies.length);
            res.cookie(process.env.AdminCookie, Admincookies, { maxAge: 0, httpOnly: true });
            res.send(response)
        } catch (e) {
            response.error = true;
            response.msg = "Failed to Logout";
            res.send(response);
        }
    } else {
        response.error = true;
        response.msg = "Invalid Request";
        res.send(response);
    }
}
export const AdminPreviousOrder = async (req, res) => {
    let response = {
        error: false,
        msg: "Request Fullfilled",
        data: [],
        auth: true
    }
    const Orders = await Order_Details_Connect.find({ Status: "paid" }).then().catch((e) => {
        response.error = true;
        response.msg = "Please login again";
        response.auth = false;
        res.send(response);
        return;
    });
    console.log(Orders)
    response.data = Orders;
    res.send(response);
}
export const AdminUpdateLocation = async (req, res) => {
    const { Latitude, Longitude } = req.body;
    console.log(Latitude + "\t" + Longitude);
    const Cookievalue = req.cookies[process.env.AdminCookie];
    console.log(Cookievalue)
    res.send("Upadted");
}
export const AdminAddDelivaryPartner = async (req, res) => {

    const { Name, Email, Mobile_No, Password } = req.body;
    console.log(Name + "\t" + Email + "\t");
    res.send("Pending");


}
