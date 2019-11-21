const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const DB =
  "mongodb+srv://vishalipu14:vishalkumar@cluster0-pjy0l.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(function(conn) {
    console.log("DB(User) is Connected");
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    maxlength: 40
  },
  role: {
    type: String,
    enum: ["admin", "restrautantOwner", "user", "deliveryBoy"],
    default: "user"
  },
  email: {
    type: String,
    required: [true],
    unique: true,
    validate: validator.isEmail
  },
  uname: { type: String, required: [true], unique: true },
  password: { type: String, required: [true] },
  confirmpassword: {
    type: String,
    required: [true],
    validate: {
      validator: function() {
        return this.password === this.confirmpassword;
      },
      message: "Password does not matched"
    }
  },
  token: { type: String },
  address: { type: String },
  orderid: { type: String}
});

userSchema.pre("save", function() {
  this.confirmpassword = undefined;
});

userSchema.method("generateToken", function() {
  const token = crypto.randomBytes(32).toString("hex");
  this.token = token;
  return this.token;
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
