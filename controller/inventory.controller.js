const Inventory = require("../models/inventory.model");

exports.get_inventory = async function (req, res) {
  Inventory.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.save_inventory = async function (req, res) {
  let inventory = new Inventory({
    serialNo: req.body.serialNo,
    modelNo: req.body.modelNo,
    description: req.body.description,
    category: req.body.category,
  });

  try {
    await inventory.save();
    res.send(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
};
