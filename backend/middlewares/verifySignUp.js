const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/users.model");

var gx_transport = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "AKIAQFI6IOZHA4TXM5HS",
    pass: "BPaaAvoaq8P/BVF6spwc8LcqfAUFRNGnjySeyJsKgjiM"
    // user: "AKIAQFI6IOZHDARNEIUJ", // generated ethereal user
    // pass: "BPhjsPJJyx1cu2+ydevcnV0tUIMiaTTrINOk1rs6sQJI", // generated ethereal password
  },
});

const checkDuplicatedEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      if(user.userType == req.body.role)
        return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong , signup fail" });
  }
};

const checkDuplicatedUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "The username already exists" });
    
      return res.status(200).json({
        successful: true,
        message: "The username valid",
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong , signup fail" });
  }
};
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex");
};

const sendOTP = (email, OTP) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // auth: {
    //   user: ,
    //   pass: ,
    // },
  });

  // const mailOptions = {
  //   from: `"Naavi App " <${process.env.EMAIL_SERVICE_USER}> `, 
  //   to: email,
  //   subject: "Your OTP",
  //   text: `Your OTP is: ${OTP}`,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
};

const sendNotificationMail = (email, subject, message) => {
    try {
      //let message = message;
      let mailOptions = {
        from:'"NaaviSupport" <admin@assets.io>', //Need to replace with the sender email
        to: email, //receiver email
        subject: subject ? subject : `User Registered using you as affiliate`,
        text: `otp`,
        html: message,
      };
      gx_transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log("Message sent: " + info.response);
          resolve({ status: true, message: `Sent the notification Email!!` });
          return;
        }
      });
    } catch (e) {
      console.log(e);
      return;
    }
};

module.exports = { checkDuplicatedEmail, checkDuplicatedUsername, checkRolesExisted, generateOTP, sendOTP, sendNotificationMail };
