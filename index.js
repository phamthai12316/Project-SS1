const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const multer = require('multer');
const app = express();

const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const generalRoute = require("./routes/generalRoute");
const accountRoute = require("./routes/accountRoute");

mongoose.connect(
  "mongodb+srv://phamthai12316:phamthai12316@cluster0-akriy.gcp.mongodb.net/Project",
  function(err) {
    // kết nối với mongodb
    if (err) {
      console.log("err" + err.toString());
    } else {
      console.log("success");
    }
  }
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(expressValidator());

app.use(express.static("public"));

app.use(
  session({
    secret: "Harvel Electric",
    resave: false,
    saveUninitialized: true
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/category", categoryRoute);
app.use("/admin", adminRoute);
app.use("/", generalRoute);
app.use("/", accountRoute);

app.listen(2000, function() {
  console.log("Hello world!");
});

module.exports = app;
