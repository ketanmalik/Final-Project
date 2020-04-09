const User = require("../models/user.model");
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;

exports.user_register = async function (req, res) {
  let user = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password,
    add1: req.body.add1,
    add2: req.body.add2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.state,
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};
