export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.emit('connection',socket.id)
        // socket.on('msg', (msg) => {
        //     console.log(msg)
        //     // socket.emit('msg', msg);
        //     socket.emit('msg', msg);
        // });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

    });
};