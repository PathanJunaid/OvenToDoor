import React from 'react'

const User_Login_terms =  {
  // Name : [{
  //   type : "text",
  //   maxLength : 20,
  //   required : true,
  // }],
  Email : [{
    type:"email",
    // Name : "Email"
    required : true,
    placeholder: "Email",
    onchange: "(e)=>InputEmail(e)"
  }],
  // DOB : [{
  //   type: "Date",
  //   required : true,
  // }],
  Password : [{
    type:"password",
    required : true,
    placeholder: "password",
    onchange: "(e)=>InputPassword(e)"
  }],
  // ConfirmPassword : [{
  //   type:"password",
  //   required : true
  // }]
}

export default User_Login_terms