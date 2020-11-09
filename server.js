// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const cart = require("./routes/cart.route");
const inventory = require("./routes/inventory.route");
const user = require("./routes/user.route");
const test = require("./routes/test.route");
const saveUser = require("./routes/saveUser.route");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static('web-des-final-project/build'));
  app.get('*', (request, response) => {
    console.log(path.join(__dirname, 'web-des-final-project', 'build', 'index.html'));
    console.log(__dirname, "dirname");
    console.log(path, "path");
    response.sendFile(path.join(__dirname, 'web-des-final-project', 'build', 'index.html'));
  });
}

app.use("/", cart);
app.use("/", inventory);
app.use("/", user);
app.use("/", test);
app.use("/", saveUser);

app.listen(PORT, console.log(`Server is running at ${PORT}`));
