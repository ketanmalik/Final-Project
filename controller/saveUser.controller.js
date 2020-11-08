const SaveUser = require("../models/saveUser.model");

exports.save_user_db = async function (req, res) {
  const userObj = new SaveUser({
    userObj: req.body.userObj,
  });
  try {
    await userObj.save();
    res.send({
      userObj: userObj,
      successMessage: "Last active user information has been stored",
    });
    return;
  } catch (err) {
    res.status(400).send(err);
    return;
  }
};

exports.get_save_user = async function (req, res) {
  const found = await SaveUser.find();
  if (!found || !found[0]) {
    res.status(400).send("No saved user");
    return;
  } else {
    res.send(found[0]);
    return;
  }
};

exports.update_save_user = async function (req, res) {
  try {
    await SaveUser.findById("5fa840049c5a40754a323750", async function (
      err,
      docs
    ) {
      docs.userObj = req.body.userObj;
      try {
        await docs.save();
        res.send({
          userObj: docs,
          successMessage: "Last active user information has been stored",
        });
        return;
      } catch (error) {
        res.status(400).send("Your information cannot be saved");
        return;
      }
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
