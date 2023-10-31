const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productName: String,
  productPrice: Number,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);
