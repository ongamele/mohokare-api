const { model, Schema } = require("mongoose");

const smsSchema = new Schema({
  accountNumber: String,
  status: String,
  createdAt: String,
});

module.exports = model("SMS", smsSchema);
