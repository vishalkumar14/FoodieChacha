const express = require("express");
const multer = require("multer");
const pug = require("pug");
const path = require("path");
const fs = require("fs");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "myImage" + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Init app
const app = express();

// EJS
app.set("view engine", "pug");

// Public Folder
app.use(express.static("./public"));
const user = { role: "user" };
app.get("/", (req, res) => {
  let ImgPath = "uploads/default.jpg";
  if (fs.existsSync("./public/uploads/myImage.jpg")) {
    ImgPath = "uploads/myImage.jpg";
    console.log(ImgPath);
  } else if (fs.existsSync("./public/uploads/myImage.jpeg")) {
    ImgPath = "uploads/myImage.jpeg";
  } else if (fs.existsSync("./public/uploads/myImage.png")) {
    ImgPath = "uploads/myImage.png";
  }
  res.render("index", {
    file: ImgPath,
    user
  });
});

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render("index", {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.redirect("/");
      } else {
        res.redirect("/");
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
