import express from "express";
import dotenv from 'dotenv';
import http from 'http'
import cookieParser from "cookie-parser";
import { Db_Connection } from './Mongodb/Db_Connection.js';
import cors from 'cors';
import User_routes from "./Routes/User_routes.js";
import Admin_Routes from './Routes/Admin_Routes.js'
import multer from "multer";
import { Server } from 'socket.io';
import { setupSocket } from "./Socket/Socket.js";
import logger from 'morgan'
dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.Client, // Allow access from this origin
    methods: ['GET', 'POST'], // Allow methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});
// Connect to MongoDB
Db_Connection();
const corsOptions = {
  origin: process.env.Client,
  methods: ["POST", "GET", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
// MiddleWare 
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(User_routes);
app.use(Admin_Routes);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors
    res.status(400).send('Multer error: ' + err.message);
  } else {
    // Pass other errors to the default error handler
    next(err);
  }
});
// MiddleWare Ends

setupSocket(io);
app.get('/',(req,res)=>{
  res.send("Server Connected")
})
const port = process.env.port;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
})
export { io };