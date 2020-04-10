const User = require("../models/user.model");
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;

exports.user_register = async function (req, res) {
  const found = await User.find({ email: req.body.email });
  if (!found || !found[0]) {
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
      res.send({
        userObj: user,
        successMessage: "Your account has been created",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Cannot process your request at this moment.");
    }
  } else {
    res.status(401).send("The user has already been registered.");
  }
};

exports.user_login = async function (req, res) {
  const email = req.query.email;
  const mode = req.query.mode;

  if (mode === "social") {
    const socialId = req.query.socialId;
    try {
      const found = await User.find({ email: email, socialId: socialId });
      if (!found || !found[0]) {
        res.status(401).send("User's Social-ID not registered");
        return;
      } else {
        res.send({ data: true, userObj: found[0] });
        return;
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    const pass = req.query.password;
    if (!email || !pass) {
      res.status(400).send("Please enter username / password");
      return;
    }
    const found = await User.find({ email: email, password: pass });

    if (!found || !found[0]) {
      res.status(401).send("Invalid username / password");
    } else {
      res.send({ data: true, userObj: found[0] });
    }
  }

  res.status(500).send("Internal Server Error");
};
