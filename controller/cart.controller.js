const Cart = require("../models/cart.model");

exports.checkout = async function (req, res) {
  let cart = new Cart({
    items: req.body.items,
    price: req.body.price,
  });
  try {
    await cart.save();
    res.send(req.body.items);
  } catch (err) {
    res.status(400).send(err);
  }
};
