const { model, Schema } = require("mongoose");

const emailSchema = new Schema({
  accountNumber: String,
  status: String,
  createdAt: String,
});

module.exports = model("Email", emailSchema);
