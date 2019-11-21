const express = require("express");
const userRouter = express.Router();
const {
  getAllUsers,
  checkInput,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadimage
} = require("../controller/userController");

const {
  signup,
  login,
  protectroute,
  isAuthorised,
  updatePassword,
  forgetPassword,
  resetPassword,
  isLoggedIn,
  logout
} = require("../controller/authController");

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/resetpassword").post(resetPassword);
userRouter.route("/forgetpassword").post(forgetPassword);
userRouter.route("/updatepassword").post(protectroute, updatePassword);
userRouter.route("/upload").post(protectroute, uploadimage);

userRouter
  .route("")
  .get(protectroute, isAuthorised(["admin"]), getAllUsers)
  .post(protectroute, checkInput, createUser);

userRouter
  .route("/:id")
  .get(protectroute, getUser)
  .post(protectroute, updateUser)
  .delete(protectroute, deleteUser);

module.exports = userRouter;
