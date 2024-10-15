const mongoose = require("mongoose");
const User = require("../models/users.model");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");

const { generateOTP, sendOTP, sendNotificationMail  } = require("../middlewares/verifySignUp");

const signUp = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const foundTemporalUser = await User.findOne({ username });

    const OTP = generateOTP();
    console.log(OTP);
    const currentTime = new Date();

    const temporalUser =
      foundTemporalUser ||
      new User({
        username,
        email,
        password,
        userType: role,
        OTP: OTP,
        isBlocked: false,
        OTPAttempts:0,
        OTPCreatedTime: currentTime,
        status:false,
      });

    
    await temporalUser.save();
    sendNotificationMail(email,"Naavi Registartion conformation OTP", "Dear User,<br>Your OTP:"+OTP+" <br>" );
    console.log(temporalUser._id);
    const oneDayInSeconds = 86400;

    const token = jwt.sign({ id: temporalUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: oneDayInSeconds,
    });

    var user ={
      id: temporalUser._id,
      username: temporalUser.username,
      email: temporalUser.email,
    }

    return res.status(201).json({
      successful: true,
      message: "User created successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ successful: false, message: "Something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  var userFound;
  if(typeof(req.body.email) !== "undefined")
      userFound = await User.findOne({ email: req.body.email });
  
  if (!userFound) return res.status(400).json({ message: "User Not Found" });

  const OTP = generateOTP();
  console.log(OTP);
  const currentTime = new Date();
  userFound.OTP=OTP;
  userFound.OTPCreatedTime=currentTime;

  
  await userFound.save();
  sendNotificationMail(req.body.email,"Naavi forgot password OTP", "Dear User,<br>Your OTP:"+OTP+" <br>" );
    //sendOTP(req.body.email, OTP);
    console.log(userFound._id);
    const oneDayInSeconds = 86400;

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: oneDayInSeconds,
    });

  return res.status(200).json({
    success: true,
    token: token,
    message: "OTP sent to your emailId",
  });

};
const sendConfirmationEmail = async (req, res) => {
  try {
    const userFound = await TemporalUser.findOne({ email: req.body.email });

    const token = userFound.emailToken;

    const url = `${
      process.env.HOST || "localhost:7000"
    }/api/auth/verification/${token}`;

    await sendConfirmationEmailFunction(url, userFound.email);

    return res.status(200).json({
      success: true,
      message: "Account confirmation email has been send successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "something went wrong" });
  }
};
// const getSession = async (req, res) => {
//   try {
//     const cookieToken = getCookieValueByName(
//       req.cookies,
//       "delivery-app-session-token"
//     );

//     if (!cookieToken)
//       return res
//         .status(404)
//         .json({ successful: false, message: "No session token was found" });
//     /// check if is a valid token
//     const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded.id, { password: 0 }).populate(
//       "roles"
//     );

//     if (!user) return res.status(404).json({ message: "No user found" });

//     return res.status(200).json({ successful: true, user, token: cookieToken });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ successful: false, message: "Unauthorized" });
//   }
// };
// const validateEmailToken = async (req, res) => {
//   try {
//     const token = req.params.token;

//     if (!token)
//       return res
//         .status(403)
//         .json({ success: false, message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_KEY);

//     const id = decoded.id;

//     const user = await TemporalUser.findById(id);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const newUser = new User({
//       name: user.name,
//       email: user.email,
//       password: await User.encryptPassword(user.password),
//       roles: user.roles,
//     });

//     await newUser.save();
//     await TemporalUser.findByIdAndRemove(user._id);

//     res.redirect(
//       `${process.env.HOST || "localhost:3000"}/#/authentication/login`
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

const login = async (req, res) => {
  try {
    var userFound;
    if(typeof(req.body.username) !== "undefined" && req.body.username != "")
      userFound = await User.findOne({ username: req.body.username });
    else
      return res.status(400).json({ message: "User/Email required" });

    if (!userFound) 
      userFound = await User.findOne({ email: req.body.username });
    
    if (!userFound)return res.status(400).json({ message: "User Not Found" });

    // const matchPassword = await User.comparePassword(
    //   req.body.password,
    //   userFound.password
    // );

    if (userFound.password!=req.body.password)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    if(userFound.userType!=req.body.role)
      return res.status(402).json({token:null, message:"Invalid Role"});
    
    const oneDayInSeconds = 86400;

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: oneDayInSeconds,
    });
    var user ={
      id : userFound._id,
      username : userFound.username,
      email: userFound.email,
    }
    return res
      .status(200)
      .json({ token: token, roles: userFound.roles, user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("delivery-app-session-token");
    return res
      .status(200)
      .json({ successfully: true, message: "User has logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const sendResetPasswordEmail = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound)
      return res.status(422).json({
        successful: false,
        message: "Doesn't exits account link with that email",
      });

    const id = userFound._id;

    const token = jwt.sign(
      {
        id,
        expiration: Date.now() + 10 * 60 * 1000,
      },
      process.env.JWT_SECRET_KEY
    );

    const url = `${
      process.env.HOST || "localhost:3000"
    }/#/authentication/resetPassword/${token}`;

    await sendResetPasswordEmailFunction(url, req.body.email);

    return res.status(200).json({
      success: true,
      message: "Reset password email has been send successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to to send reset password email",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    const token = req.params.token;

    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
    );

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    if (Date.now() > decoded.expiration)
      return res.status(422).json({
        successful: false,
        message: "Time to reset password exceeded",
      });

    const id = decoded.id;

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: "User not found" });

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ successful: false, message: "Passwords doesn't match" });

    if (newPassword.length < 5)
      return res
        .status(400)
        .json({ successful: false, message: "Passwords min length is 5" });

    const encodedPassword = await User.encryptPassword(newPassword);

    userFound.password = encodedPassword;

    await userFound.save();

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to update password",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, token } = req.body;

    
    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const id = decoded.id;

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: "User not found" });

    if (otp !== userFound.OTP)
      return res
        .status(400)
        .json({ successful: false, message: "OTP doesn't match" });

    userFound.OTPverified = true;

    await userFound.save();

    return res
      .status(200)
      .json({ success: true, message: "OTP Verified successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to update password",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const id = decoded.id;

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: "User not found" });

    
    userFound.password = password;

    await userFound.save();

    return res
      .status(200)
      .json({ success: true, message: "Password Updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, fail to update password",
    });
  }
};

module.exports = {
  signUp,
  forgotPassword,
  login,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  logout,
  verifyOTP,
  updatePassword,
};
