export const setupSocket=(io)=>{
    io.on('connection',(socket)=>{
        console.log(socket.id)
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    })
}
// export setupSocket