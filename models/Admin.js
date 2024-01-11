const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  name: String,
  surname: String,
  phoneNumber: String,
  email: String,
  password: String,
  createdAt: String,
});

module.exports = model("Admin", adminSchema);
