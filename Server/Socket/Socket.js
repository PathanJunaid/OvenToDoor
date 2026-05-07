import { Notification_Connect, Order_Details_Connect } from "../Mongodb/Schema.js";

export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.emit('connection',socket.id)
        // socket.on('msg', (msg) => {
        //     console.log(msg)
        //     // socket.emit('msg', msg);
        //     socket.emit('msg', msg);
        // });
        socket.on('Order_id',async(id)=>{
            console.log(id)
            const data = await Order_Details_Connect.findById({_id:id}).then((res)=>{return res}).catch((e)=>{console.log(e)});
            socket.emit('Order_id_data',data);
            console.log(data);
        })
        socket.on('Order-Status',async(data)=>{
            console.log(data);
            const Order = await Order_Details_Connect.findOneAndUpdate({Order_id:data.Order_id},{Status: data.Status}).then((res)=>{
                return res;
            }).catch((e)=>{
                console.log(e)
                // emit a socket of eror to admin and User 
            });
            const Notification = await Notification_Connect.findByIdAndUpdate(data.Notification_id,{Status: data.Status}).then((res)=>{
                return res;
            }).catch((e)=>{
                console.log(e)
                // emit a socket of eror to admin and User 
            });
            io.emit("Refresh_Data_Client",{})
        })
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

    });
};