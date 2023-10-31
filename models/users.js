const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Use Date as the type
  updatedAt: { type: Date, default: Date.now }, // Use Date as the type
});


module.exports = mongoose.model("User", userSchema);

