const express = require("express");
const bookingRouter = express.Router();
const { checkout,addorderhistory } = require("../controller/bookingController");
bookingRouter.route("/checkout").post(checkout);
bookingRouter.route("/addorderhistory").post(addorderhistory);
module.exports = bookingRouter;