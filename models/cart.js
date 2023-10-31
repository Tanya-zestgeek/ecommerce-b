const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  productName: String,
  productPrice: Number,
  description: String,
});

module.exports = mongoose.model("Cart", cartSchema);
