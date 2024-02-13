const { model, Schema } = require("mongoose");

const paymentArrangementSchema = new Schema({
  accountNumber: String,
  paymentDate: String,
  amount: Number,
  createdAt: String,
});

module.exports = model("PaymentArrangement", paymentArrangementSchema);
