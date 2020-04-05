// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const cart = require("./routes/cart.route");
const inventory = require("./routes/inventory.route");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI =
  "mongodb+srv://km-demo:kmdemo@project-cluster-gbokh.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://localhost/firstDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose in connected");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", cart);
app.use("/", inventory);

app.listen(PORT, console.log(`Server is running at ${PORT}`));
