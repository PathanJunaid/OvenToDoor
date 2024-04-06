import Razorpay from 'razorpay'
export const newPayment = async (req, res) => {
    var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })
    const params = {
        amount: 100, // Amount in paisa (e.g., ₹100.00 is 10000 paisa)
        currency: 'INR',
        receipt: 'order_rcptid_11', // Unique receipt ID for the payment
        payment_capture: 1, // Auto-capture payments (1 for true, 0 for false)
        method: 'upi' // Specify UPI as the payment method
    };

    instance.orders.create(params, (err, order) => {
        if (err) {
            console.error(err);
            // Handle error
        } else {
            console.log(order);
            // Process the order object, which contains the payment link
            console.log('UPI Payment Link:', order.short_url);
        }
    });

    // const data = instance.paymentLink.create({
    //     upi_link: true,
    //     amount: 500,
    //     currency: "INR",
    //     accept_partial: false,
    //     first_min_partial_amount: 100,
    //     description: "For XYZ purpose",
    //     customer: {
    //       name: "Junaid Khan",
    //       email: "zunaid931@gmail.com",
    //       contact: "+919580055187"
    //     },
    //     notify: {
    //       sms: true,
    //       email: true
    //     },
    //     reminder_enable: true,
    //     notes: {
    //       policy_name: "Test"
    //     }
    //   })
}

