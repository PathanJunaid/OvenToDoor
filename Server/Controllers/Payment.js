import Razorpay from 'razorpay'

export const Payment = async (req, res) => {

    var instance = new Razorpay({ key_id: process.env.key, key_secret: process.env.secret })

    

    const data = await instance.paymentLink.create({
        amount: 500,
        currency: "INR",
        accept_partial: false,
        // first_min_partial_amount: 100,
        description: "For XYZ purpose",
        customer: {
            name: "Gaurav Kumar",
            email: "zunaid931@gmail.com",
            contact: "+919580055187"
        },
        notify: {
            sms: true,
            email: true
        },
        reminder_enable: true,
        notes: {
            policy_name: "Jeevan Bima"
        },
        callback_url: "http://localhost:4000/payment/status",
        callback_method: "get"
    }).then().catch((e) => { console.log(e); return false })
    // pending  Update to database 
    // Order_Details_Connect.create({
    //     Order_id:data.id,
    //     User_id:"",
    //     Items_id: [],
    //     Payment_of:"",
    //     Status:false,
    // })
    console.log(data);
    if (data) {
        res.redirect(data.short_url);
    }
    // res.send(data)
}
export const PaymentStatus = async (req, res) => {
    console.log(req.query.razorpay_payment_link_status)
    // pending  Update to database 
    res.send(req.data)
    // redirect to order page 
}