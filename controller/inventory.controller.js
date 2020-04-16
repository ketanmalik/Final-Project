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

exports.create_part = async function (req, res) {
  let part = new Inventory({
    serialNo: req.body.serialNo,
    modelNo: req.body.modelNo,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    specification: req.body.specification,
  });

  try {
    await part.save();
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.update_part = async function (req, res) {
  const id = req.body._id;
  try {
    await Inventory.findById(id, async function (err, docs) {
      docs.serialNo = req.body.serialNo;
      docs.modelNo = req.body.modelNo;
      docs.specification = req.body.specification;
      docs.price = req.body.price;
      docs.description = req.body.description;
      docs.category = req.body.category;

      try {
        docs.save();
        res.send(docs);
        return;
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(error);
  }
};

exports.delete_part = async function (req, res) {
  const id = req.body._id;
  try {
    const part = await Inventory.findByIdAndDelete(id);
    res.send("Part deleted");
    return;
  } catch (err) {
    res.status(400).send(err);
    return;
  }
};
