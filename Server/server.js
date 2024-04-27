import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import fs from 'fs';
import { Db_Connection } from './Mongodb/Db_Connection.js';
import cors from 'cors';
import User_routes from "./Routes/User_routes.js";
import Admin_Routes from './Routes/Admin_Routes.js'
import multer from "multer";
dotenv.config();
const app = express();
// Connect to MongoDB
Db_Connection();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["POST", "GET", "PUT"],
  credentials: true,
};
// MiddleWare 
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

const port = process.env.port;
// var ;
// Reading json pizza Data 
const Pizza_Data_Function = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./API/Pizza.json', 'utf-8', (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        reject(err); // Reject the promise if there's an error
        return;
      }
      try {
        // Parse the JSON data and resolve the promise with it
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        reject(error); // Reject the promise if there's an error while parsing
      }
    });
  });
};
const Pizza_Data = await Pizza_Data_Function()
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
})