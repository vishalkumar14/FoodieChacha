const mongoose = require("mongoose");

const DB = "mongodb+srv://vishalipu14:vishalkumar@cluster0-pjy0l.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(function(conn) {
    console.log("DB(Booking) is Connected");
  });

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  planprice: { type: Number, min: 1, default: 0, required: true },
  packageType: { type: String, required: true },
  planid: { type: String, required: [true] }
});

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: [true, "User ID is Required"]
  },
  orders: {
    type: [planSchema],
    default: undefined
  }
});

const bookingModel = mongoose.model("bookingModel", orderSchema);
module.exports = bookingModel;
