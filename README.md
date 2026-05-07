# OvenToDoor [Live Link](https://oventodoor.netlify.app/)

OvenToDoor is a comprehensive food delivery application built using the MERN stack. It provides distinct interfaces for users and admins to ensure seamless interaction and efficient management of orders.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Interface
- **Add to Cart**: Users can browse the menu and add items to their cart.
- **Place Orders**: Users can place orders and track their order status.
- **Order History**: Users can view and track their previous orders.
- **Password Management**: Users can change their password using an OTP sent to their email.

### Admin Interface
- **Manage Dishes**: Admins can add new dishes, update existing dishes, and manage the menu.
- **Order Management**: Admins can view and manage incoming orders, changing their status in real-time using Socket.io.


## Tech Stack

- **Frontend**: React, React Router, Styled-components
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **File Uploads**: Multer
- **Authentication**: JWT (JSON Web Tokens), Bcrypt
- **Email**: Nodemailer

### Admin Login Credentials
These credentials are used in log in admin page
[Admin Page](https://oventodoor.netlify.app/admin)
- **Email** : 786786jk786786@gmail.com
- **Password** : 12345

## Installation

Clone the repository and install dependencies for both client and server:

```bash
git clone https://github.com/yourusername/OvenToDoor.git
cd OvenToDoor

# Install client dependencies
cd Client
npm install

# Install server dependencies
cd ../Server
npm install
```
## Usage
### Set up environment variables

Server: Create a .env file in the Server directory with the following content:

```bash 
port= port
cookiename= User Cookie name
jwtsecrettoken= 
usergmail= nodemailer
usergmailpass= nodemailer
AdminCookie= Admin Cookie name
key= Razorpay key
secret== Razor pay Secret id
AWS_ACCESS_KEY_ID==
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
mongo_db_URL=
Client=Client URL
SERVER=Server URL
```
Client: create a .env file in the Client directory with environment-specific settings.
```bash
VITE_APP_Server = Server URL 
```
### Start the development server
Start the client:
```bash
cd Client
npm start
```
In a new terminal, start the server:
```bash
cd Server
npm start
```

## Contributing
We appreciate all contributions to this project! Special thanks to:

[SidMohsin](https://github.com/SidMohsin),[Kamran](https://www.linkedin.com/in/mohammad-kamran-885a4a234/) and [Devesh Nirupam](https://github.com/DeveshNirupam) .
