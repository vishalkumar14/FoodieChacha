const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = async function() {
  const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function(req, file, cb) {
      cb(null, "myImage" + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single("myImage");

  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }
};
