const User = require("../models/user.model");
const Part = require("../models/part.model");
const Cart = require("../models/cart.model");
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;

exports.user_create = async function (req, res) {
  let user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.request_quote = async function (req, res) {};
