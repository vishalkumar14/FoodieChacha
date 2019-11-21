const userModel = require("../model/userModel");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUser = await userModel.find();
    res.status(200).json({
      success: "All Users are found",
      data: allUser
    });
  } catch (err) {
    res.status(401).json({
      success: "Users are not found"
    });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params["id"]);
    res.status(200).json({
      success: "User is Found",
      data: user
    });
  } catch (err) {
    res.status(401).json({
      success: "User is not Found"
    });
  }
};

module.exports.checkInput = async (req, res, next) => {
  if (req.body) {
    if (req.body.name && req.body.userName) {
      next();
    } else {
      return res.status(400).json({
        status: "failed",
        response: "Fill the Required Fields"
      });
    }
  } else {
    return res.status(400).json({
      status: "failed",
      response: "Fill the Required Fields"
    });
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);
    res.status(200).json({
      success: "User is Created",
      data: user
    });
  } catch (err) {
    res.status(401).json({
      success: "User Could not be Created"
    });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id || req.decoded || req.body["_id"];
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(201).json({
      success: "User Updated Sucessfully"
    });
  } catch (err) {
    return res.status(403).json({
      data: "User ID is Invalid"
    });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  userModel.findOneAndDelete({ _id: { $eq: req.params["id"] } }, function(err, doc) {
    if (err) {
      res.status(404).json({
        success: "Error, ID is Invaild"
      });
    } else {
      res.status(200).json({
        success: "User is Removed",
        data: doc
      });
    }
  });
};

module.exports.uploadimage = async (req, res, next) => {};
