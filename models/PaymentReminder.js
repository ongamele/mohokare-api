const { model, Schema } = require("mongoose");

const paymentReminderSchema = new Schema({
  notificationType: String,
  age: String,
  message: String,
  accountNumber: String,
  status: String,
  createdAt: String,
});

module.exports = model("PaymentReminder", paymentReminderSchema);
