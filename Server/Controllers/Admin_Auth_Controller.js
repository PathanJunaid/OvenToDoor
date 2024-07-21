import { Admin_Connect, Notification_Connect, Order_Details_Connect, OTP_Connect } from "../Mongodb/Schema.js";
import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { io } from '../server.js'
import nodemailer from 'nodemailer';
export const AdminAuthenticated = async (req, res, next) => {
    let response = {
        error: false,
        msg: "Inavlid request",
        data: [],
        auth: false
    }
    try {
        const Cookie_Value = req.cookies[process.env.AdminCookie];
        // console.log(Cookie_Value);
        const id = jwt.verify(Cookie_Value, process.env.jwtsecrettoken, (err, res) => {
            if (err) {

            } else {
                return res.id;
            }
        });
        const Admin_Details = await Admin_Connect.findById(id).then((res)=>{return res}).catch((e) => {
            response = {
                error: true,
                msg: "Admin not found",
                data: [],
                auth: false
            }
        });
        // console.log(Admin_Details)
        if (!Admin_Details) {
            res.send(response);
            return;
        }
        else {
            const Notify = await Notification_Connect.find().sort({ createdAt: -1 }).then((res) => {
                // console.log(res);s
                return res;
            }).catch((e) => {
                console.log(e);
                return false;
            })
            // console.log(Notify)
            io.emit('previous_Notification', Notify);
            next();

        }

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
        res.cookie(process.env.AdminCookie, jwtToken, { maxAge: 600000000, httpOnly: false,sameSite:'none',secure:true });
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
const IsOTP = async () => {
    const number = Math.floor(Math.random() * 1000000);
    const otp_already = await OTP_Connect.findOne({ OTP: number }).then().catch((e) => {
        res.send("Try Again");
        return;
    });
    if (otp_already) {
        return false;
    }
    else {
        return number;
    }
}
// Generating OTP to change password request 
export const AdminForgetPassword = async (req, res) => {
    // Getting Email from Request 
    const { Email } = req.body;
    let response = {
        error: false,
        msg: "OTP sent",
        auth: false
    }
    const isuser = await Admin_Connect.findOne({ Email }).then((response) => {
        return response
    }).catch((e) => {
        response.msg = "Email not registered"
        response.error = true;
        console.log("error" + e)
    });
    if (!isuser) {
        response.msg = "Email not registered"
        response.error = true;
        return res.send(response)
    }
    // Creating Random six digit humber
    let number = await IsOTP().then((value) => { return value }).catch((e) => { });
    let loop = 3;
    // Checking the OTP already Assigned to some mail 
    while (!number && loop--) {
        number = await IsOTP();
    }
    if (!number) {
        response.msg = "Unable to generate OTP"
        response.error = true
        return response;
    }
    // Inserting the OTP value to Database 
    const OTP_Created = await OTP_Connect.create({
        OTP: number,
        Email: Email
    })
    // Setting timeout so that thet otp must delete after 2 mins 
    const auto_delete = setTimeout(async () => {
        await OTP_Connect.findByIdAndDelete(OTP_Created._id).then().catch((e) => {
            res.send("Try Again");
            return;
        });
    }, 120 * 1000);
    // Creating a mail transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.usergmail,
            pass: process.env.usergmailpass
        }
    })
    // Creating the mail 
    let mailOptions = {
        from: 'noreply@gmail.com', // Sender email address
        to: Email, // Receiver email address
        subject: 'ForgetPassword Request', // Subject line
        text: `${number} is your one-time-password for password reset.
        This is valid only for 1 minute.
        `
    };
    // Sending mail 
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:');
    } catch (error) {
        console.log('Error occurred:', error);
        response.error = true;
        response.msg = "Unable to send OTP"
        res.send("Please try again");
        return
    }
    res.send(response);
}
// Validating OTP entered by user 
export const AdminValidateOTP = async (req, res) => {
    const { OTP, Password } = req.body;
    let response = {
        error: false,
        msg: "Pasword Changed",
        auth: false
    }
    if (!OTP) {
        response.error = true;
        response.msg = "Try Again"
        res.send(response);
        return
    }
    const OTP_db = await OTP_Connect.findOne({ OTP: OTP }).then().catch((e) => {
        response.error = true;
        response.msg = "Invalid OTP"
        res.send(response);
    });
    if (!OTP_db) {
        res.send(response);
        return;
    } else {
        const hashedPass = await brcypt.hash(Password, 8);
        const user = await Admin_Connect.findOneAndUpdate({ Email: OTP_db.Email }, { Password: hashedPass }).then().catch((e) => {
            response.error = true;
            response.msg = "Unable to Change Pasword";
            res.send(response);
            return;
        });
        await OTP_Connect.findOneAndDelete({ OTP: OTP }).then().catch((e) => {
        });
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
    const Orders = await Order_Details_Connect.find({ Status: { $ne: "Failed" } }).then().catch((e) => {
        response.error = true;
        response.msg = "Please login again";
        response.auth = false;
        res.send(response);
        return;
    });
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
