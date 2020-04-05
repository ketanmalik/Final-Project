const Cart = require("../models/cart.model");

exports.request_quote = async function (req, res) {
  let cart = new Cart({
    items: req.body.items,
  });
  try {
    await cart.save();
    res.send(req.body.items);
  } catch (err) {
    res.status(400).send(err);
  }
};
