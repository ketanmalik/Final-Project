const User = require("../models/user.model");
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;

exports.user_register = async function (req, res) {
  let user = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password ? req.body.password : "-1",
    add1: req.body.add1 ? req.body.add1 : "-1",
    add2: req.body.add2,
    city: req.body.city ? req.body.city : "-1",
    state: req.body.state ? req.body.state : "-1",
    zip: req.body.zip ? req.body.zip : "-1",
    country: req.body.country ? req.body.country : "-1",
    socialId: req.body.socialId ? req.body.socialId : "-1",
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};
