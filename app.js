const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

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

var querystring = require("querystring");
var dataStore = require("./dataStore.js");

var mailchimpClientId = "964544728141";
var mailchimpSecretKey = "1c9db8e60b8faa7fd02636852139b08108974743f1703ceddd";

// app.get("/mailchimp/auth/authorize", function(req, res) {
//   res.redirect(
//     "https://login.mailchimp.com/oauth2/authorize?" +
//       querystring.stringify({
//         response_type: "code",
//         client_id: mailchimpClientId,
//         redirect_uri: "https://harvel-electric.herokuapp.com"
//       })
//   );
// });

// app.get("https://harvel-electric.herokuapp.com", function(req, res) {
//   request
//     .post("https://login.mailchimp.com/oauth2/token")
//     .send(
//       querystring.stringify({
//         grant_type: "authorization_code",
//         client_id: mailchimpClientId,
//         client_secret: mailchimpSecretKey,
//         redirect_uri: "https://harvel-electric.herokuapp.com",
//         code: req.query.code
//       })
//     )
//     .end((err, result) => {
//       if (err) {
//         res.send(
//           "An unexpected error occured while trying to perform MailChimp oAuth"
//         );
//       } else {
//         // we need to get the metadata for the user
//         request
//           .get("https://login.mailchimp.com/oauth2/metadata")
//           .set("Accept", "application/json")
//           .set("Authorization", "OAuth " + result.body.access_token)
//           .end((err, metaResult) => {
//             if (err) {
//               res.send(
//                 "An unexpected error occured while trying to get MailChimp meta oAuth"
//               );
//             } else {
//               // save the result.body.access_token
//               // save the metadata in metaResult.body
//               // against the current user
//               var mailchimpConf = metaResult;
//               mailchimpConf.access_token = result.body.access_token;
//               dataStore.saveMailChimpForUser(
//                 mailchimpConf.login.email,
//                 metaResult
//               );
//               res.redirect("/?email=" + mailchimpConf.login.email);
//             }
//           });
//       }
//     });
// });
// app.get("/mailchimp/lists", function(req, res) {
//   var mailchimpConf = dataStore.getMailChimpForUser(req.query.email);
//   request
//     .get(mailchimpConf.api_endpoint + "/3.0/lists")
//     .set("Accept", "application/json")
//     .set("Authorization", "OAuth " + mailchimpConf.access_token)
//     .end((err, result) => {
//       if (err) {
//         res.status(500).json(err);
//       } else {
//         res.json(result.body.lists);
//       }
//     });
// });

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
module.exports = app;
