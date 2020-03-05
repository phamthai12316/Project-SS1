var nodemailer = require("nodemailer");

exports.about = function(req, res) {
  var title = "About";
  var responseData = {
    session: req.session,
    title: title,
    obj: req.body
  };
  res.render("about", responseData);
};
exports.page = function(req, res) {
  var title = "Page";
  var responseData = {
    session: req.session,
    title: title,
    obj: req.body
  };
  res.render("page", responseData);
};
exports.contact = function(req, res) {
  var title = "contact";
  var responseData = {
    session: req.session,
    title: title,
    obj: req.body
  };
  res.render("contact", responseData);
};

exports.mailchimp = function(req, res) {
  var title = "mailChimp";
  var responseData = {
    session: req.session,
    title: title,
    obj: req.body
  };
  res.render("integrated-mailchimp", responseData);
};

exports.pickList = function(req, res) {
  var title = "pickList";
  var responseData = {
    session: req.session,
    title: title,
    obj: req.body
  };
  res.render("pick-a-list", responseData);
};

exports.sendContact = function(req, res) {
  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "araceli.wuckert83@ethereal.email",
      pass: "tvszEBUU8bpdEckKet"
    }
  });
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "araceli.wuckert83@ethereal.email",
    to: "thaiphth1904009@fpt.edu.vn",
    subject: "Send mail",
    // text: 'You recieved message from ',
    html:
      "<p>You have got a new message</b><ul><li>Subject:" +
      req.body.subject +
      "</li><li>Message:" +
      req.body.message +
      "</li></ul>"
  };
  transporter.sendMail(mainOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent: " + info.response);
      res.redirect("/");
      alert("Send access");
    }
  });
};
