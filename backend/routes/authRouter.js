const router = require("express").Router();
const {
  login,
  signUp,
  forgotPassword,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  logout,
  verifyOTP,
  updatePassword,
} = require("../controllers/authControllers");
const { checkDuplicatedEmail, checkDuplicatedUsername } = require("../middlewares/verifySignUp");


router.post("/signup", [checkDuplicatedEmail], signUp);
router.get("/logout", logout);
router.post("/verifyusername", checkDuplicatedUsername);
router.post("/verifyotp", verifyOTP);
router.post("/forgotPassword", forgotPassword);
router.post("/updatepassword", updatePassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", login);
module.exports = router;
