const express = require("express");
const app = express();

const port = process.env.port || 3000;
const mongoose = require("mongoose");
// Set Mongoose to use native promises
mongoose.Promise = global.Promise;

const { MONGODB_URI } = require("./config");
app.use(express.json()); //used to parse body

const auth = require("./routes/auth-route");
const productGet = require("./routes/products-route");
const cartGet = require("./routes/cart-route");

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", auth);
app.use("/product", productGet);
app.use("/cart", cartGet);
app.get("/", (req, res) => {
  res.send("Welcome to first get request");
});

app.listen(port, () => {
  console.log("Listen on Port ::", port);
});
