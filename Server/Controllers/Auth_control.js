import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OTP_Connect, User_Connect } from "../Mongodb/Schema.js";
import nodemailer from 'nodemailer';
export const User_Authenticated = async (req, res, next) => {
    try {
        const jwt_Token = req.cookies[process.env.cookiename];
        // console.log()
        const id = jwt.verify(jwt_Token, process.env.jwtsecrettoken, (err, decoded) => {
            if (err) {
                console.error("Error decoding auth token");
            } else {
                return decoded.id;
            }
        });
        // Getting user info using id 
        const isuser = await User_Connect.findById(id).then((response) => {
            return response;
        }).catch((e) => {
            console.log("error")
        });
        if (!isuser) {
            res.send({
                msg : "User not available",
                auth : false
            });
            return
        }
        next();

    } catch (e) {
        res.send("Please login");
    }
}

export const Login_Cont = async (req, res) => {
    const { Email, Password } = req.body;
    let response = {
        error:false,
        msg:"",
        auth:false
    }
    // finding user in database 
    const isuser = await User_Connect.findOne({
        Email
    }).then().catch((e) => {
        response.error = true;
        response.msg = "MongoDb error";
        console.log(e)
        return;
    });
    // Checking reponse from database 
    if (!isuser) {
        response.error = true;
        response.msg = "User not registered";
        res.send(response);
        return
    }
    // comparing password 
    const comparedpass = bcrypt.compareSync(Password, isuser.Password);
    // Checking response and setting Cookie or Authenticating user
    if (comparedpass) {
        // console.log(req)

        const jwt_token = jwt.sign({ id: isuser._id }, process.env.jwtsecrettoken);
        res.cookie(process.env.cookiename, jwt_token, { maxAge: 6000000, httpOnly: false })
        response.error = false;
        response.msg = "Sign in Completed";
        response.auth = true
        res.send(response);
    } else {
        response.error = true;
        response.msg = "Wrong Password";
        res.send(response);
    }
}

export const Sign_Cont = async (req, res) => {
    const { User_Name, Email, Password } = req.body;
    let response = {
        msg:"Account Created",
        auth:false,
        error:false
    }
    // Finding user in database 
    const isuser = await User_Connect.findOne({
        Email
    }).then().catch((e) => {
        response = {
            msg:"Server error",
            auth:false,
            error:true
        }
        res.send(response);
        return;
    });
    // checking response status from database 
    if (isuser) {
        response = {
            msg:"User Already Exist",
            auth:false,
            error:true
        }
        res.send(response);
        return;
    }
    // Securing Password before storing in database 
    const hashedPass = await bcrypt.hash(Password, 8);
    // creating a new user 
    await User_Connect.create({
        User_Name, Email, Password: hashedPass
    }).then((response) => {
        console.log(response);
    }).catch((e)=>{
        response.error = true;
        response.msg = "Unable to create User"
    });
    // sending response 
    res.send(response);
}

export const Logout_control = (req, res) => {
    const cookies = req.cookies[process.env.cookiename];
    let response = {
        msg : "",
        auth: false,
        error: false
    }
    if (cookies) {
        try {
            const value = cookies.substr(cookies.indexOf("=") + 1, cookies.length);
            res.cookie(process.env.cookiename, value, { maxAge: 0, httpOnly: true });
            response.msg = "Logged Out"
            res.send(response)
        } catch (e) {
            response.msg = "Logged Out"
            res.send("failed to logout");
        }
    } else {
        res.send("No cookie")
    }
}
// OTP Generator function and checcking if the OTP already exist 
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
export const ForgetPassword = async (req, res) => {
    // Getting Email from Request 
    const { Email } = req.body;
    // Getting user info using id 
    if (!Email) {
        res.send("Server Error");
        return;
    }
    const isuser = await User_Connect.findOne({ Email }).then((response) => {
        return response
    }).catch((e) => {
        console.log("error" + e)
    });
    if (!isuser) {
        res.send("Please register.");
        return
    }
    // Creating Random six digit humber
    let number = await IsOTP();
    let loop = 3;
    // Checking the OTP already Assigned to some mail 
    while (!number && loop--) {
        number = await IsOTP();
    }
    if (!number) {
        res.send("Please try again later.");
        return
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
        to: isuser.Email, // Receiver email address
        subject: 'ForgetPassword Request', // Subject line
        text: `${number} is your one-time-password for password reset.
        This is valid only for 1 minute.
        `
    };
    // Sending mail 
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
    } catch (error) {
        console.log('Error occurred:', error);
        res.send("Please try again");
        return
    }
    res.send("Email sent");
}
// Validating OTP entered by user 
export const ValidateOTP = async (req, res) => {
    const { OTP, Password } = req.body;
    if (!OTP) {
        res.send("try again.");
        return
    }
    const OTP_db = await OTP_Connect.findOne({ OTP: OTP }).then().catch((e) => {
        res.send("Try Again");
        return;
    });
    if (!OTP_db) {
        res.send("Invalid OTP");
        return;
    } else {
        const hashedPass = await bcrypt.hash(Password, 8);
        const user = await User_Connect.findOneAndUpdate({ Email: OTP_db.Email }, { Password: hashedPass }).then().catch((e) => {
            res.send("Try Again");
            return;
        });;
        console.log(user)
        await OTP_Connect.findOneAndDelete({ OTP: OTP }).then().catch((e) => {
            res.send("Try Again");
            return;
        });
        res.send("Password Changed");
    }

}
